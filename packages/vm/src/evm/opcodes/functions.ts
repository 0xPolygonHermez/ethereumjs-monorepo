import Common from '@ethereumjs/common'
import { Address, BN, keccak256, setLengthRight, TWO_POW256, MAX_INTEGER } from 'ethereumjs-util'
import {
  addressToBuffer,
  describeLocation,
  getDataSlice,
  jumpIsValid,
  jumpSubIsValid,
  trap,
  writeCallOutput,
} from './util'
import { ERROR } from '../../exceptions'
import { RunState } from './../interpreter'
const { smtUtils } = require('@polygon-hermez/zkevm-commonjs')
export interface SyncOpHandler {
  (runState: RunState, common: Common): void
}

export interface AsyncOpHandler {
  (runState: RunState, common: Common): Promise<void>
}

export type OpHandler = SyncOpHandler | AsyncOpHandler

// the opcode functions
export const handlers: Map<number, OpHandler> = new Map([
  // 0x00: STOP
  [
    0x00,
    function (runState) {
      runState.vcm.computeFunctionCounters('opStop', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      trap(ERROR.STOP)
    },
  ],
  // 0x01: ADD
  [
    0x01,
    function (runState) {
      runState.vcm.computeFunctionCounters('opAdd', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = a.add(b).mod(TWO_POW256)
      runState.stack.push(r)
    },
  ],
  // 0x02: MUL
  [
    0x02,
    function (runState) {
      runState.vcm.computeFunctionCounters('opMul', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = a.mul(b).mod(TWO_POW256)
      runState.stack.push(r)
    },
  ],
  // 0x03: SUB
  [
    0x03,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSub', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = a.sub(b).toTwos(256)
      runState.stack.push(r)
    },
  ],
  // 0x04: DIV
  [
    0x04,
    function (runState) {
      runState.vcm.computeFunctionCounters('opDiv', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      let r
      if (b.isZero()) {
        r = new BN(b)
      } else {
        r = a.div(b)
      }
      runState.stack.push(r)
    },
  ],
  // 0x05: SDIV
  [
    0x05,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSDiv', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      let [a, b] = runState.stack.popN(2)
      let r
      if (b.isZero()) {
        r = new BN(b)
      } else {
        a = a.fromTwos(256)
        b = b.fromTwos(256)
        r = a.div(b).toTwos(256)
      }
      runState.stack.push(r)
    },
  ],
  // 0x06: MOD
  [
    0x06,
    function (runState) {
      runState.vcm.computeFunctionCounters('opMod', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      let r
      if (b.isZero()) {
        r = new BN(b)
      } else {
        r = a.mod(b)
      }
      runState.stack.push(r)
    },
  ],
  // 0x07: SMOD
  [
    0x07,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSMod', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      let [a, b] = runState.stack.popN(2)
      let r
      if (b.isZero()) {
        r = new BN(b)
      } else {
        a = a.fromTwos(256)
        b = b.fromTwos(256)
        r = a.abs().mod(b.abs())
        if (a.isNeg()) {
          r = r.ineg()
        }
        r = r.toTwos(256)
      }
      runState.stack.push(r)
    },
  ],
  // 0x08: ADDMOD
  [
    0x08,
    function (runState) {
      runState.vcm.computeFunctionCounters('opAddMod', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b, c] = runState.stack.popN(3)
      let r
      if (c.isZero()) {
        r = new BN(c)
      } else {
        r = a.add(b).mod(c)
      }
      runState.stack.push(r)
    },
  ],
  // 0x09: MULMOD
  [
    0x09,
    function (runState) {
      runState.vcm.computeFunctionCounters('opMulMod', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b, c] = runState.stack.popN(3)
      let r
      if (c.isZero()) {
        r = new BN(c)
      } else {
        r = a.mul(b).mod(c)
      }
      runState.stack.push(r)
    },
  ],
  // 0x0a: EXP
  [
    0x0a,
    function (runState, common) {
      const [base, exponent] = runState.stack.popN(2)
      runState.vcm.computeFunctionCounters('opExp', {
        bytesExponentLength: exponent.toArrayLike(Buffer).length,
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      if (exponent.isZero()) {
        runState.stack.push(new BN(1))
        return
      }
      const byteLength = exponent.byteLength()
      if (byteLength < 1 || byteLength > 32) {
        trap(ERROR.OUT_OF_RANGE)
      }
      const gasPrice = common.param('gasPrices', 'expByte')
      const amount = new BN(byteLength).muln(gasPrice)
      runState.eei.useGas(amount, 'EXP opcode')

      if (base.isZero()) {
        runState.stack.push(new BN(0))
        return
      }
      const m = BN.red(TWO_POW256)
      const redBase = base.toRed(m)
      const r = redBase.redPow(exponent)
      runState.stack.push(r.fromRed())
    },
  ],
  // 0x0b: SIGNEXTEND
  [
    0x0b,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSignExtend', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      /* eslint-disable-next-line prefer-const */
      let [k, val] = runState.stack.popN(2)
      if (k.ltn(31)) {
        const signBit = k.muln(8).iaddn(7).toNumber()
        const mask = new BN(1).ishln(signBit).isubn(1)
        if (val.testn(signBit)) {
          val = val.or(mask.notn(256))
        } else {
          val = val.and(mask)
        }
      } else {
        // return the same value
        val = new BN(val)
      }
      runState.stack.push(val)
    },
  ],
  // 0x10 range - bit ops
  // 0x10: LT
  [
    0x10,
    function (runState) {
      runState.vcm.computeFunctionCounters('opLT', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = new BN(a.lt(b) ? 1 : 0)
      runState.stack.push(r)
    },
  ],
  // 0x11: GT
  [
    0x11,
    function (runState) {
      runState.vcm.computeFunctionCounters('opGT', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = new BN(a.gt(b) ? 1 : 0)
      runState.stack.push(r)
    },
  ],
  // 0x12: SLT
  [
    0x12,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSLT', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = new BN(a.fromTwos(256).lt(b.fromTwos(256)) ? 1 : 0)
      runState.stack.push(r)
    },
  ],
  // 0x13: SGT
  [
    0x13,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSGT', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = new BN(a.fromTwos(256).gt(b.fromTwos(256)) ? 1 : 0)
      runState.stack.push(r)
    },
  ],
  // 0x14: EQ
  [
    0x14,
    function (runState) {
      runState.vcm.computeFunctionCounters('opEq', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = new BN(a.eq(b) ? 1 : 0)
      runState.stack.push(r)
    },
  ],
  // 0x15: ISZERO
  [
    0x15,
    function (runState) {
      runState.vcm.computeFunctionCounters('opIsZero', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const a = runState.stack.pop()
      const r = new BN(a.isZero() ? 1 : 0)
      runState.stack.push(r)
    },
  ],
  // 0x16: AND
  [
    0x16,
    function (runState) {
      runState.vcm.computeFunctionCounters('opAnd', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = a.and(b)
      runState.stack.push(r)
    },
  ],
  // 0x17: OR
  [
    0x17,
    function (runState) {
      runState.vcm.computeFunctionCounters('opOr', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = a.or(b)
      runState.stack.push(r)
    },
  ],
  // 0x18: XOR
  [
    0x18,
    function (runState) {
      runState.vcm.computeFunctionCounters('opXor', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      const r = a.xor(b)
      runState.stack.push(r)
    },
  ],
  // 0x19: NOT
  [
    0x19,
    function (runState) {
      runState.vcm.computeFunctionCounters('opNot', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const a = runState.stack.pop()
      const r = a.notn(256)
      runState.stack.push(r)
    },
  ],
  // 0x1a: BYTE
  [
    0x1a,
    function (runState) {
      runState.vcm.computeFunctionCounters('opByte', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [pos, word] = runState.stack.popN(2)
      if (pos.gten(32)) {
        runState.stack.push(new BN(0))
        return
      }

      const r = new BN(word.shrn((31 - pos.toNumber()) * 8).andln(0xff))
      runState.stack.push(r)
    },
  ],
  // 0x1b: SHL
  [
    0x1b,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSHL', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      if (a.gten(256)) {
        runState.stack.push(new BN(0))
        return
      }

      const r = b.shln(a.toNumber()).iand(MAX_INTEGER)
      runState.stack.push(r)
    },
  ],
  // 0x1c: SHR
  [
    0x1c,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSHR', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)
      if (a.gten(256)) {
        runState.stack.push(new BN(0))
        return
      }

      const r = b.shrn(a.toNumber())
      runState.stack.push(r)
    },
  ],
  // 0x1d: SAR
  [
    0x1d,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSAR', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [a, b] = runState.stack.popN(2)

      let r
      const isSigned = b.testn(255)
      if (a.gten(256)) {
        if (isSigned) {
          r = new BN(MAX_INTEGER)
        } else {
          r = new BN(0)
        }
        runState.stack.push(r)
        return
      }

      const c = b.shrn(a.toNumber())
      if (isSigned) {
        const shiftedOutWidth = 255 - a.toNumber()
        const mask = MAX_INTEGER.shrn(shiftedOutWidth).shln(shiftedOutWidth)
        r = c.ior(mask)
      } else {
        r = c
      }
      runState.stack.push(r)
    },
  ],
  // 0x20 range - crypto
  // 0x20: SHA3
  [
    0x20,
    function (runState) {
      const [offset, length] = runState.stack.popN(2)
      runState.vcm.computeFunctionCounters('opSha3', {
        inputSize: length.toNumber(),
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      let data = Buffer.alloc(0)
      if (!length.isZero()) {
        data = runState.memory.read(offset.toNumber(), length.toNumber())
      }
      const r = new BN(keccak256(data))
      runState.stack.push(r)
    },
  ],
  // 0x30 range - closure state
  // 0x30: ADDRESS
  [
    0x30,
    function (runState) {
      runState.vcm.computeFunctionCounters('opAddress', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const address = new BN(runState.eei.getAddress().buf)
      runState.stack.push(address)
    },
  ],
  // 0x31: BALANCE
  [
    0x31,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opBalance', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const addressBN = runState.stack.pop()
      const address = new Address(addressToBuffer(addressBN))
      const balance = await runState.eei.getExternalBalance(address)
      runState.stack.push(balance)
    },
  ],
  // 0x32: ORIGIN
  [
    0x32,
    function (runState) {
      runState.vcm.computeFunctionCounters('opOrigin', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getTxOrigin())
    },
  ],
  // 0x33: CALLER
  [
    0x33,
    function (runState) {
      runState.vcm.computeFunctionCounters('opCaller', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getCaller())
    },
  ],
  // 0x34: CALLVALUE
  [
    0x34,
    function (runState) {
      runState.vcm.computeFunctionCounters('opCallValue', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getCallValue())
    },
  ],
  // 0x35: CALLDATALOAD
  [
    0x35,
    function (runState) {
      runState.vcm.computeFunctionCounters('opCalldataLoad', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const pos = runState.stack.pop()
      if (pos.gt(runState.eei.getCallDataSize())) {
        runState.stack.push(new BN(0))
        return
      }

      const i = pos.toNumber()
      let loaded = runState.eei.getCallData().slice(i, i + 32)
      loaded = loaded.length ? loaded : Buffer.from([0])
      const r = new BN(setLengthRight(loaded, 32))

      runState.stack.push(r)
    },
  ],
  // 0x36: CALLDATASIZE
  [
    0x36,
    function (runState) {
      runState.vcm.computeFunctionCounters('opCalldataSize', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const r = runState.eei.getCallDataSize()
      runState.stack.push(r)
    },
  ],
  // 0x37: CALLDATACOPY
  [
    0x37,
    function (runState) {
      const [memOffset, dataOffset, dataLength] = runState.stack.popN(3)
      if (!dataLength.eqn(0)) {
        const data = getDataSlice(runState.eei.getCallData(), dataOffset, dataLength)
        runState.vcm.computeFunctionCounters('opCalldataCopy', {
          inputSize: data.length,
          isCreate: runState.eei._env.isCreate,
          isDeploy: runState.eei._env.isDeploy,
        })
        const memOffsetNum = memOffset.toNumber()
        const dataLengthNum = dataLength.toNumber()
        runState.memory.extend(memOffsetNum, dataLengthNum)
        runState.memory.write(memOffsetNum, dataLengthNum, data)
      }
    },
  ],
  // 0x38: CODESIZE
  [
    0x38,
    function (runState) {
      runState.vcm.computeFunctionCounters('opCodeSize', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getCodeSize())
    },
  ],
  // 0x39: CODECOPY
  [
    0x39,
    function (runState) {
      const [memOffset, codeOffset, dataLength] = runState.stack.popN(3)

      if (!dataLength.eqn(0)) {
        const data = getDataSlice(runState.eei.getCode(), codeOffset, dataLength)
        runState.vcm.computeFunctionCounters('opCodeCopy', {
          inputSize: data.length,
          isCreate: runState.eei._env.isCreate,
          isDeploy: runState.eei._env.isDeploy,
        })
        const memOffsetNum = memOffset.toNumber()
        const lengthNum = dataLength.toNumber()
        runState.memory.extend(memOffsetNum, lengthNum)
        runState.memory.write(memOffsetNum, lengthNum, data)
      }
    },
  ],
  // 0x3b: EXTCODESIZE
  [
    0x3b,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opExtCodeSize', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const addressBN = runState.stack.pop()
      const size = await runState.eei.getExternalCodeSize(addressBN)
      runState.stack.push(size)
    },
  ],
  // 0x3c: EXTCODECOPY
  [
    0x3c,
    async function (runState) {
      const [addressBN, memOffset, codeOffset, dataLength] = runState.stack.popN(4)
      if (!dataLength.eqn(0)) {
        const code = await runState.eei.getExternalCode(addressBN)

        const data = getDataSlice(code, codeOffset, dataLength)
        runState.vcm.computeFunctionCounters('opExtCodeCopy', {
          inputSize: data.length,
          bytecodeLen: code.length,
          isCreate: runState.eei._env.isCreate,
          isDeploy: runState.eei._env.isDeploy,
        })
        const memOffsetNum = memOffset.toNumber()
        const lengthNum = dataLength.toNumber()
        runState.memory.extend(memOffsetNum, lengthNum)
        runState.memory.write(memOffsetNum, lengthNum, data)
      }
    },
  ],
  // 0x3f: EXTCODEHASH
  [
    0x3f,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opExtCodeHash', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const addressBN = runState.stack.pop()
      const code = await runState.eei.getExternalCode(addressBN)
      if (code.length === 0) {
        runState.stack.push(new BN(0))
        return
      }
      // Use linear poseidon hash
      const lpCode = await smtUtils.hashContractBytecode(code.toString('hex'))
      runState.stack.push(new BN(lpCode.slice(2), 16))
    },
  ],
  // 0x3d: RETURNDATASIZE
  [
    0x3d,
    function (runState) {
      runState.vcm.computeFunctionCounters('opReturnDataSize', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getReturnDataSize())
    },
  ],
  // 0x3e: RETURNDATACOPY
  [
    0x3e,
    function (runState) {
      const [memOffset, returnDataOffset, dataLength] = runState.stack.popN(3)

      if (!dataLength.eqn(0)) {
        const data = getDataSlice(runState.eei.getReturnData(), returnDataOffset, dataLength)
        runState.vcm.computeFunctionCounters('opReturnDataCopy', {
          inputSize: data.length,
          isCreate: runState.eei._env.isCreate,
          isDeploy: runState.eei._env.isDeploy,
        })
        const memOffsetNum = memOffset.toNumber()
        const lengthNum = dataLength.toNumber()
        runState.memory.extend(memOffsetNum, lengthNum)
        runState.memory.write(memOffsetNum, lengthNum, data)
      }
    },
  ],
  // 0x3a: GASPRICE
  [
    0x3a,
    function (runState) {
      runState.vcm.computeFunctionCounters('opGasPrice', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getTxGasPrice())
    },
  ],
  // '0x40' range - block operations
  // 0x40: BLOCKHASH
  [
    0x40,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opBlockHash', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const number = runState.stack.pop()
      const hash = await runState.eei.getBatchHash(number)
      runState.stack.push(hash)
    },
  ],
  // 0x41: COINBASE
  [
    0x41,
    function (runState) {
      runState.vcm.computeFunctionCounters('opCoinbase', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getBlockCoinbase())
    },
  ],
  // 0x42: TIMESTAMP
  [
    0x42,
    function (runState) {
      runState.vcm.computeFunctionCounters('opTimestamp', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getBlockTimestamp())
    },
  ],
  // 0x43: NUMBER
  [
    0x43,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opNumber', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const num = await runState.eei.getBlockNum()
      runState.stack.push(num)
    },
  ],
  // 0x44: DIFFICULTY
  [
    0x44,
    function (runState) {
      runState.vcm.computeFunctionCounters('opDifficulty', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getBlockDifficulty())
    },
  ],
  // 0x45: GASLIMIT
  [
    0x45,
    function (runState) {
      runState.vcm.computeFunctionCounters('opGasLimit', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getBlockGasLimit())
    },
  ],
  // 0x46: CHAINID
  [
    0x46,
    function (runState) {
      runState.vcm.computeFunctionCounters('opChainId', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getChainId())
    },
  ],
  // 0x47: SELFBALANCE
  [
    0x47,
    function (runState) {
      runState.vcm.computeFunctionCounters('opSelfBalance', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getSelfBalance())
    },
  ],
  // 0x48: BASEFEE
  [
    0x48,
    function (runState) {
      runState.vcm.computeFunctionCounters('opBaseFee', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.eei.getBlockBaseFee())
      //runState.stack.push(new BN(0))
    },
  ],
  // 0x50 range - 'storage' and execution
  // 0x50: POP
  [
    0x50,
    function (runState) {
      runState.vcm.computeFunctionCounters('opPop', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.pop()
    },
  ],
  // 0x51: MLOAD
  [
    0x51,
    function (runState) {
      runState.vcm.computeFunctionCounters('opMLoad', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const pos = runState.stack.pop()
      const word = runState.memory.read(pos.toNumber(), 32)
      runState.stack.push(new BN(word))
    },
  ],
  // 0x52: MSTORE
  [
    0x52,
    function (runState) {
      runState.vcm.computeFunctionCounters('opMStore', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [offset, word] = runState.stack.popN(2)
      const buf = word.toArrayLike(Buffer, 'be', 32)
      const offsetNum = offset.toNumber()
      runState.memory.extend(offsetNum, 32)
      runState.memory.write(offsetNum, 32, buf)
    },
  ],
  // 0x53: MSTORE8
  [
    0x53,
    function (runState) {
      runState.vcm.computeFunctionCounters('opMStore8', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [offset, byte] = runState.stack.popN(2)

      // NOTE: we're using a 'trick' here to get the least significant byte
      // NOTE: force cast necessary because `BN.andln` returns number but
      // the types are wrong
      const buf = Buffer.from([byte.andln(0xff) as unknown as number])
      const offsetNum = offset.toNumber()
      runState.memory.extend(offsetNum, 1)
      runState.memory.write(offsetNum, 1, buf)
    },
  ],
  // 0x54: SLOAD
  [
    0x54,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opSLoad', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const key = runState.stack.pop()
      const keyBuf = key.toArrayLike(Buffer, 'be', 32)
      const value = await runState.eei.storageLoad(keyBuf)
      const valueBN = value.length ? new BN(value) : new BN(0)
      runState.stack.push(valueBN)
    },
  ],
  // 0x55: SSTORE
  [
    0x55,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opSStore', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [key, val] = runState.stack.popN(2)

      const keyBuf = key.toArrayLike(Buffer, 'be', 32)
      // NOTE: this should be the shortest representation
      let value
      if (val.isZero()) {
        value = Buffer.from([])
      } else {
        value = val.toArrayLike(Buffer, 'be')
      }

      await runState.eei.storageStore(keyBuf, value)
    },
  ],
  // 0x56: JUMP
  [
    0x56,
    function (runState) {
      runState.vcm.computeFunctionCounters('opJump', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const dest = runState.stack.pop()
      if (dest.gt(runState.eei.getCodeSize())) {
        trap(ERROR.INVALID_JUMP + ' at ' + describeLocation(runState))
      }

      const destNum = dest.toNumber()

      if (!jumpIsValid(runState, destNum)) {
        trap(ERROR.INVALID_JUMP + ' at ' + describeLocation(runState))
      }

      runState.programCounter = destNum
    },
  ],
  // 0x57: JUMPI
  [
    0x57,
    function (runState) {
      runState.vcm.computeFunctionCounters('opJumpI', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [dest, cond] = runState.stack.popN(2)
      if (!cond.isZero()) {
        if (dest.gt(runState.eei.getCodeSize())) {
          trap(ERROR.INVALID_JUMP + ' at ' + describeLocation(runState))
        }

        const destNum = dest.toNumber()

        if (!jumpIsValid(runState, destNum)) {
          trap(ERROR.INVALID_JUMP + ' at ' + describeLocation(runState))
        }

        runState.programCounter = destNum
      }
    },
  ],
  // 0x58: PC
  [
    0x58,
    function (runState) {
      runState.vcm.computeFunctionCounters('opPC', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(new BN(runState.programCounter - 1))
    },
  ],
  // 0x59: MSIZE
  [
    0x59,
    function (runState) {
      runState.vcm.computeFunctionCounters('opMSize', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(runState.memoryWordCount.muln(32))
    },
  ],
  // 0x5a: GAS
  [
    0x5a,
    function (runState) {
      runState.vcm.computeFunctionCounters('opGas', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(new BN(runState.eei.getGasLeft()))
    },
  ],
  // 0x5b: JUMPDEST
  [
    0x5b,
    function (runState) {
      runState.vcm.computeFunctionCounters('opJumpDest', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
    },
  ],
  // 0x5c: BEGINSUB
  [
    0x5c,
    function (runState) {
      trap(ERROR.INVALID_BEGINSUB + ' at ' + describeLocation(runState))
    },
  ],
  // 0x5d: RETURNSUB
  [
    0x5d,
    function (runState) {
      if (runState.returnStack.length < 1) {
        trap(ERROR.INVALID_RETURNSUB)
      }

      const dest = runState.returnStack.pop()
      runState.programCounter = dest.toNumber()
    },
  ],
  // 0x5e: JUMPSUB
  [
    0x5e,
    function (runState) {
      const dest = runState.stack.pop()

      if (dest.gt(runState.eei.getCodeSize())) {
        trap(ERROR.INVALID_JUMPSUB + ' at ' + describeLocation(runState))
      }

      const destNum = dest.toNumber()

      if (!jumpSubIsValid(runState, destNum)) {
        trap(ERROR.INVALID_JUMPSUB + ' at ' + describeLocation(runState))
      }

      runState.returnStack.push(new BN(runState.programCounter))
      runState.programCounter = destNum + 1
    },
  ],
  // 0x5f: PUSH0
  [
    0x5f,
    function (runState) {
      runState.vcm.computeFunctionCounters('opPush0', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.stack.push(new BN(0))
    },
  ],
  // 0x60: PUSH
  [
    0x60,
    function (runState) {
      const numToPush = runState.opCode - 0x5f
      runState.vcm.computeFunctionCounters('_opPush', {
        pushBytes: numToPush,
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const loaded = new BN(
        runState.eei.getCode().slice(runState.programCounter, runState.programCounter + numToPush)
      )
      runState.programCounter += numToPush
      runState.stack.push(loaded)
    },
  ],
  // 0x80: DUP
  [
    0x80,
    function (runState) {
      runState.vcm.computeFunctionCounters('_opDup', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const stackPos = runState.opCode - 0x7f
      runState.stack.dup(stackPos)
    },
  ],
  // 0x90: SWAP
  [
    0x90,
    function (runState) {
      runState.vcm.computeFunctionCounters('_opSwap', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const stackPos = runState.opCode - 0x8f
      runState.stack.swap(stackPos)
    },
  ],
  // 0xa0: LOG
  [
    0xa0,
    function (runState) {
      const [memOffset, memLength] = runState.stack.popN(2)
      runState.vcm.computeFunctionCounters('_opLog', {
        inputSize: memLength.toNumber(),
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const topicsCount = runState.opCode - 0xa0

      const topics = runState.stack.popN(topicsCount)
      const topicsBuf = topics.map(function (a: BN) {
        return a.toArrayLike(Buffer, 'be', 32)
      })

      let mem = Buffer.alloc(0)
      if (!memLength.isZero()) {
        mem = runState.memory.read(memOffset.toNumber(), memLength.toNumber())
      }

      runState.eei.log(mem, topicsCount, topicsBuf)
    },
  ],

  // '0xf0' range - closures
  // 0xf0: CREATE
  [
    0xf0,
    async function (runState) {
      const [value, offset, length] = runState.stack.popN(3)
      runState.vcm.computeFunctionCounters('opCreate', {
        bytesNonceLength: runState.eei._env.contract.nonce.addn(1).toArrayLike(Buffer).length,
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.vcm.computeFunctionCounters('_processContractCall', {
        bytecodeLength: length.toNumber(),
        isDeploy: false,
        isCreate: true,
        isCreate2: false,
      })
      const gasLimit = runState.messageGasLimit!
      runState.messageGasLimit = undefined

      let data = Buffer.alloc(0)
      if (!length.isZero()) {
        data = runState.memory.read(offset.toNumber(), length.toNumber())
      }

      const ret = await runState.eei.create(gasLimit, value, data)
      runState.stack.push(ret.returnCode)
      return ret.results
    },
  ],
  // 0xf5: CREATE2
  [
    0xf5,
    async function (runState) {
      if (runState.eei.isStatic()) {
        trap(ERROR.STATIC_STATE_CHANGE)
      }
      const [value, offset, length, salt] = runState.stack.popN(4)
      runState.vcm.computeFunctionCounters('opCreate2', {
        bytesNonceLength: runState.eei._env.contract.nonce.addn(1).toArrayLike(Buffer).length,
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      runState.vcm.computeFunctionCounters('_processContractCall', {
        bytecodeLength: length.toNumber(),
        isDeploy: false,
        isCreate: false,
        isCreate2: true,
      })
      const gasLimit = runState.messageGasLimit!
      runState.messageGasLimit = undefined

      let data = Buffer.alloc(0)
      if (!length.isZero()) {
        data = runState.memory.read(offset.toNumber(), length.toNumber())
      }

      const ret = await runState.eei.create2(
        gasLimit,
        value,
        data,
        salt.toArrayLike(Buffer, 'be', 32)
      )
      runState.stack.push(ret.returnCode)
      return ret.results
    },
  ],
  // 0xf1: CALL
  [
    0xf1,
    async function (runState: RunState) {
      runState.vcm.computeFunctionCounters('opCall', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [_currentGasLimit, toAddr, value, inOffset, inLength, outOffset, outLength] =
        runState.stack.popN(7)
      const toAddress = new Address(addressToBuffer(toAddr))
      const bytecodeLength = await runState.eei.getExternalCodeSize(toAddr)
      runState.vcm.computeFunctionCounters('_processContractCall', {
        bytecodeLength: bytecodeLength.toNumber(),
        isDeploy: false,
        isCreate: false,
        isCreate2: false,
      })
      let data = Buffer.alloc(0)
      if (!inLength.isZero()) {
        data = runState.memory.read(inOffset.toNumber(), inLength.toNumber())
      }

      const gasLimit = runState.messageGasLimit!
      runState.messageGasLimit = undefined

      const ret = await runState.eei.call(gasLimit, toAddress, value, data, outLength)
      // Write return data to memory
      writeCallOutput(runState, outOffset, outLength)
      runState.stack.push(ret.returnCode)
      return ret.results
    },
  ],
  // 0xf2: CALLCODE
  [
    0xf2,
    async function (runState: RunState) {
      runState.vcm.computeFunctionCounters('opCallCode', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const [_currentGasLimit, toAddr, value, inOffset, inLength, outOffset, outLength] =
        runState.stack.popN(7)
      const toAddress = new Address(addressToBuffer(toAddr))

      const bytecodeLength = await runState.eei.getExternalCodeSize(toAddr)
      runState.vcm.computeFunctionCounters('_processContractCall', {
        bytecodeLength: bytecodeLength.toNumber(),
        isDeploy: false,
        isCreate: false,
        isCreate2: false,
      })
      const gasLimit = runState.messageGasLimit!
      runState.messageGasLimit = undefined

      let data = Buffer.alloc(0)
      if (!inLength.isZero()) {
        data = runState.memory.read(inOffset.toNumber(), inLength.toNumber())
      }

      const ret = await runState.eei.callCode(gasLimit, toAddress, value, data, outLength)
      // Write return data to memory
      writeCallOutput(runState, outOffset, outLength)
      runState.stack.push(ret.returnCode)
      return ret.results
    },
  ],
  // 0xf4: DELEGATECALL
  [
    0xf4,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opDelegateCall', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const value = runState.eei.getCallValue()
      const [_currentGasLimit, toAddr, inOffset, inLength, outOffset, outLength] =
        runState.stack.popN(6)
      const toAddress = new Address(addressToBuffer(toAddr))
      const bytecodeLength = await runState.eei.getExternalCodeSize(toAddr)
      runState.vcm.computeFunctionCounters('_processContractCall', {
        bytecodeLength: bytecodeLength.toNumber(),
        isDeploy: false,
        isCreate: false,
        isCreate2: false,
      })
      let data = Buffer.alloc(0)
      if (!inLength.isZero()) {
        data = runState.memory.read(inOffset.toNumber(), inLength.toNumber())
      }

      const gasLimit = runState.messageGasLimit!
      runState.messageGasLimit = undefined

      const ret = await runState.eei.callDelegate(gasLimit, toAddress, value, data, outLength)
      // Write return data to memory
      writeCallOutput(runState, outOffset, outLength)
      runState.stack.push(ret.returnCode)
      return ret.results
    },
  ],
  // 0x06: STATICCALL
  [
    0xfa,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opStaticCall', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const value = new BN(0)
      const [_currentGasLimit, toAddr, inOffset, inLength, outOffset, outLength] =
        runState.stack.popN(6)
      const toAddress = new Address(addressToBuffer(toAddr))
      const bytecodeLength = await runState.eei.getExternalCodeSize(toAddr)
      runState.vcm.computeFunctionCounters('_processContractCall', {
        bytecodeLength: bytecodeLength.toNumber(),
        isDeploy: false,
        isCreate: false,
        isCreate2: false,
      })
      const gasLimit = runState.messageGasLimit!
      runState.messageGasLimit = undefined

      let data = Buffer.alloc(0)
      if (!inLength.isZero()) {
        data = runState.memory.read(inOffset.toNumber(), inLength.toNumber())
      }

      const ret = await runState.eei.callStatic(gasLimit, toAddress, value, data, outLength)
      // Write return data to memory
      writeCallOutput(runState, outOffset, outLength)
      runState.stack.push(ret.returnCode)
      return ret.results
    },
  ],
  // 0xf3: RETURN
  [
    0xf3,
    function (runState) {
      const [offset, length] = runState.stack.popN(2)
      runState.vcm.computeFunctionCounters('opReturn', {
        returnLength: length.toNumber(),
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
        depth: runState.eei._env.depth,
      })
      let returnData = Buffer.alloc(0)
      if (!length.isZero()) {
        returnData = runState.memory.read(offset.toNumber(), length.toNumber())
      }
      runState.eei.finish(returnData)
    },
  ],
  // 0xfd: REVERT
  [
    0xfd,
    function (runState) {
      const [offset, length] = runState.stack.popN(2)
      runState.vcm.computeFunctionCounters('opRevert', {
        revertSize: length.toNumber(),
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      let returnData = Buffer.alloc(0)
      if (!length.isZero()) {
        returnData = runState.memory.read(offset.toNumber(), length.toNumber())
      }
      runState.eei.revert(returnData)
    },
  ],
  // '0x70', range - other
  // 0xff: SELFDESTRUCT
  [
    0xff,
    async function (runState) {
      runState.vcm.computeFunctionCounters('opSendAll', {
        isCreate: runState.eei._env.isCreate,
        isDeploy: runState.eei._env.isDeploy,
      })
      const selfdestructToAddressBN = runState.stack.pop()
      const selfdestructToAddress = new Address(addressToBuffer(selfdestructToAddressBN))
      return runState.eei.selfDestruct(selfdestructToAddress)
    },
  ],
])

// Fill in rest of PUSHn, DUPn, SWAPn, LOGn for handlers
const pushFn = handlers.get(0x60)!
for (let i = 0x61; i <= 0x7f; i++) {
  handlers.set(i, pushFn)
}
const dupFn = handlers.get(0x80)!
for (let i = 0x81; i <= 0x8f; i++) {
  handlers.set(i, dupFn)
}
const swapFn = handlers.get(0x90)!
for (let i = 0x91; i <= 0x9f; i++) {
  handlers.set(i, swapFn)
}
const logFn = handlers.get(0xa0)!
for (let i = 0xa1; i <= 0xa4; i++) {
  handlers.set(i, logFn)
}
