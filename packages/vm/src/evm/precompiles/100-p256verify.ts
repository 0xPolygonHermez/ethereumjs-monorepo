// packages/vm/src/evm/precompiles/p256verify.ts

import { setLengthLeft, setLengthRight, BN } from 'ethereumjs-util'
import { PrecompileInput } from './types'
import { OOGResult, ExecResult } from '../evm'
const assert = require('assert')
import { ec as EC } from 'elliptic';
// Initialize the P-256 curve (secp256r1)
const ec = new EC('p256'); // 'p256' is equivalent to 'prime256v1' or 'secp256r1'

function verifyP256Signature(
  msgHash: Buffer,
  r: Buffer,
  s: Buffer,
  pubKeyX: Buffer,
  pubKeyY: Buffer
): boolean {
  // Check that all inputs have the correct length (32 bytes each)
  if (
    pubKeyX.length !== 32 ||
    pubKeyY.length !== 32 ||
    r.length !== 32 ||
    s.length !== 32 ||
    msgHash.length !== 32
  ) {
    throw new Error('Invalid input lengths for P-256 signature verification');
  }

  // Recreate the public key from the X and Y coordinates
  const key = ec.keyFromPublic(
    {
      x: pubKeyX.toString('hex'),
      y: pubKeyY.toString('hex'),
    },
    'hex'
  );

  // Create the signature object
  const signature = {
    r: r.toString('hex'),
    s: s.toString('hex'),
  };

  // Verify the signature
  return key.verify(msgHash.toString('hex'), signature);
}

/**
 * Precompiled contract for P256 signature verification (RIP-7212).
 * It takes the public key, message hash, and signature, and verifies if the signature is valid.
 *
 * Input:
 * - publicKey: 64 bytes (32 bytes for X coordinate, 32 bytes for Y coordinate)
 * - signature: 64 bytes (32 bytes for R, 32 bytes for S)
 * - message: 32 bytes (hash of the message)
 */
export default function (opts: PrecompileInput): ExecResult {
  assert(opts.data)

  // Gas cost is 3450
  const gasUsed = new BN(opts._common.param('gasPrices', 'p256verify'))

  // Check if there is enough gas to run this precompile
  if (opts.gasLimit.lt(gasUsed)) {
    return OOGResult(opts.gasLimit)
  }

  // Ensure the data is the correct length for P256VERIFY
  // Input should be 128 bytes: 64 bytes for public key, 64 bytes for signature
  const data = setLengthRight(opts.data, 160)

  const msg = data.slice(0, 32)
  const r = data.slice(32, 64)
  const s = data.slice(64, 96)
  const pubKeyX = data.slice(96, 128)
  const pubKeyY = data.slice(128, 160) // Assuming a 32-byte message hash

  // Optionally, update the function counters for VM tracing/debugging
  // opts._VM.vcm.computeFunctionCounters('preP256Verify', {
  //   pubKeyX: new BN(pubKeyX).toString('hex'),
  //   pubKeyY: new BN(pubKeyY).toString('hex'),
  //   r: new BN(r).toString('hex'),
  //   s: new BN(s).toString('hex'),
  // })

  // Verify the signature
  let isValid
  try {
    isValid = verifyP256Signature(pubKeyX, pubKeyY, r, s, msg)
  } catch (e: any) {
    // If verification fails, return an empty buffer
    return {
      gasUsed,
      returnValue: Buffer.alloc(0),
    }
  }

  // Return 1 for valid signature, 0 for invalid
  const returnValue = isValid ? setLengthLeft(Buffer.from([1]), 32) : Buffer.alloc(0)

  return {
    gasUsed,
    returnValue: returnValue,
  }
}
