import tape from 'tape'
import { INVALID_PARAMS } from '../../../lib/rpc/error-code'
import { baseRequest, baseSetup, params } from '../helpers'
import { checkError } from '../util'
import Common, { Chain } from '@ethereumjs/common'
import Blockchain from '@ethereumjs/blockchain'

const method = 'engine_executePayloadV1'

const validTestVector = {
  blockHash: '0xb084c10440f05f5a23a55d1d7ebcb1b3892935fb56f23cdc9a7f42c348eed174',
  parentHash: '0xa0513a503d5bd6e89a144c3268e5b7e9da9dbf63df125a360e3950a7d0d67131',
  feeRecipient: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
  stateRoot: '0xca3149fa9e37db08d1cd49c9061db1002ef1cd58db2210f2115c8c989b2bdf45',
  receiptsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  logsBloom:
    '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  random: '0x0000000000000000000000000000000000000000000000000000000000000000',
  blockNumber: '0x1',
  gasLimit: '0x989680',
  gasUsed: '0x0',
  timestamp: '0x5',
  extraData: '0x',
  baseFeePerGas: '0x7',
  transactions: [],
}

tape(`${method}: call with invalid block hash without 0x`, async (t) => {
  const { server } = baseSetup({ engine: true })

  const req = params(method, [
    { ...validTestVector, parentHash: validTestVector.parentHash.slice(2) },
  ])
  const expectRes = checkError(
    t,
    INVALID_PARAMS,
    "invalid argument 0 for key 'parentHash': hex string without 0x prefix"
  )
  await baseRequest(t, server, req, 200, expectRes)
})

tape(`${method}: call with non stored block`, async (t) => {
  const commonChain = new Common({ chain: Chain.Mainnet, hardfork: 'london' })
  const blockchain = await Blockchain.create({ validateBlocks: false, validateConsensus: false })
  const { server } = baseSetup({ engine: true, blockchain, commonChain })

  const req = params(method, [
    {
      ...validTestVector,
      parentHash: '0xc184c10440f05f5a23a55d1d7ebcb1b3892935fb56f23cdc9a7f42c348ffd174',
    },
  ])
  const expectRes = (res: any) => {
    t.equal(res.body.result.status, 'SYNCING')
    t.equal(res.body.result.validationError, null)
    t.equal(res.body.result.latestValidHash, null)
  }
  await baseRequest(t, server, req, 200, expectRes)
})

// tape(`${method}: call with valid data`, async (t) => {
//   const commonChain = new Common({ chain: Chain.Mainnet, hardfork: 'london' })
//   const { server } = baseSetup({ engine: true, commonChain, includeVM: true })
//
//   const req = params(method, [validTestVector])
//   const expectRes = checkError(
//     t,
//     INVALID_PARAMS,
//     "invalid argument 0 for key 'parentHash': hex string without 0x prefix"
//   )
//   await baseRequest(t, server, req, 200, expectRes)
// })

tape(`${method}: call with invalid hex string as block hash`, async (t) => {
  const { server } = baseSetup({ engine: true })

  const req = params(method, [
    {
      ...validTestVector,
      blockHash: '0xinvalid',
    },
  ])
  const expectRes = checkError(
    t,
    INVALID_PARAMS,
    "invalid argument 0 for key 'blockHash': invalid block hash"
  )
  await baseRequest(t, server, req, 200, expectRes)
})
