// @ts-check

import * as Digest from './digest.js'

/**
 * @template {string} Name
 * @template {number} Code
 * @param {Object} options
 * @param {Name} options.name
 * @param {Code} options.code
 * @param {(input: Uint8Array) => Await<Uint8Array>} options.encode
 */
export const from = ({ name, code, encode }) => new Hasher(name, code, encode)

/**
 * Hasher represents a hashing algorithm implementation that produces as
 * `MultihashDigest`.
 *
 * @template {string} Name
 * @template {number} Code
 * @class
 * @implements {MultihashHasher}
 */
export class Hasher {
  /**
   *
   * @param {Name} name
   * @param {Code} code
   * @param {(input: Uint8Array) => Await<Uint8Array>} encode
   */
  constructor (name, code, encode) {
    this.name = name
    this.code = code
    this.encode = encode
  }

  /**
   * @param {Uint8Array} input
   * @returns {Promise<Digest.Digest>}
   */
  async digest (input) {
    const digest = await this.encode(input)
    return Digest.create(this.code, digest)
  }
}

/**
 * @typedef {import('./interface').MultihashHasher} MultihashHasher
 */

/**
 * @template T
 * @typedef {Promise<T>|T} Await
 */
