var elliptic = require('elliptic')

var HEX_CHARS = '0123456789abcdef'.split('')
var KECCAK_PADDING = [1, 256, 65536, 16777216]
var SHIFT = [0, 8, 16, 24]
var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648]

var Keccak = function Keccak (bits) {
  return {
    blocks: [],
    reset: true,
    block: 0,
    start: 0,
    blockCount: 1600 - (bits << 1) >> 5,
    outputBlocks: bits >> 5,
    s: (function (s) {
      return [].concat(s, s, s, s, s)
    })([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }
}

var update = function update (state, message) {
  var length = message.length
  var blocks = state.blocks
  var byteCount = state.blockCount << 2
  var blockCount = state.blockCount
  var outputBlocks = state.outputBlocks
  var s = state.s
  var index = 0
  var i
  var code

  // update
  while (index < length) {
    if (state.reset) {
      state.reset = false
      blocks[0] = state.block
      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0
      }
    }
    if (typeof message !== 'string') {
      for (i = state.start; index < length && i < byteCount; ++index) {
        blocks[i >> 2] |= message[index] << SHIFT[i++ & 3]
      }
    } else {
      for (i = state.start; index < length && i < byteCount; ++index) {
        code = message.charCodeAt(index)
        if (code < 0x80) {
          blocks[i >> 2] |= code << SHIFT[i++ & 3]
        } else if (code < 0x800) {
          blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3]
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3]
        } else if (code < 0xd800 || code >= 0xe000) {
          blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3]
          blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3]
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3]
        } else {
          code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff)
          blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3]
          blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3]
          blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3]
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3]
        }
      }
    }
    state.lastByteIndex = i
    if (i >= byteCount) {
      state.start = i - byteCount
      state.block = blocks[blockCount]
      for (i = 0; i < blockCount; ++i) {
        s[i] ^= blocks[i]
      }
      f(s)
      state.reset = true
    } else {
      state.start = i
    }
  }

  // finalize
  i = state.lastByteIndex
  blocks[i >> 2] |= KECCAK_PADDING[i & 3]
  if (state.lastByteIndex === byteCount) {
    blocks[0] = blocks[blockCount]
    for (i = 1; i < blockCount + 1; ++i) {
      blocks[i] = 0
    }
  }
  blocks[blockCount - 1] |= 0x80000000
  for (i = 0; i < blockCount; ++i) {
    s[i] ^= blocks[i]
  }
  f(s)

  // toString
  var hex = ''
  i = 0
  var j = 0
  var block
  while (j < outputBlocks) {
    for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
      block = s[i]
      hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F] + HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F] + HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F] + HEX_CHARS[block >> 28 & 0x0F] + HEX_CHARS[block >> 24 & 0x0F]
    }
    if (j % blockCount === 0) {
      f(s)
      i = 0
    }
  }
  return '0x' + hex
}

var f = function f (s) {
  var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49

  for (n = 0; n < 48; n += 2) {
    c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40]
    c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41]
    c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42]
    c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43]
    c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44]
    c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45]
    c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46]
    c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47]
    c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48]
    c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49]

    h = c8 ^ (c2 << 1 | c3 >>> 31)
    l = c9 ^ (c3 << 1 | c2 >>> 31)
    s[0] ^= h
    s[1] ^= l
    s[10] ^= h
    s[11] ^= l
    s[20] ^= h
    s[21] ^= l
    s[30] ^= h
    s[31] ^= l
    s[40] ^= h
    s[41] ^= l
    h = c0 ^ (c4 << 1 | c5 >>> 31)
    l = c1 ^ (c5 << 1 | c4 >>> 31)
    s[2] ^= h
    s[3] ^= l
    s[12] ^= h
    s[13] ^= l
    s[22] ^= h
    s[23] ^= l
    s[32] ^= h
    s[33] ^= l
    s[42] ^= h
    s[43] ^= l
    h = c2 ^ (c6 << 1 | c7 >>> 31)
    l = c3 ^ (c7 << 1 | c6 >>> 31)
    s[4] ^= h
    s[5] ^= l
    s[14] ^= h
    s[15] ^= l
    s[24] ^= h
    s[25] ^= l
    s[34] ^= h
    s[35] ^= l
    s[44] ^= h
    s[45] ^= l
    h = c4 ^ (c8 << 1 | c9 >>> 31)
    l = c5 ^ (c9 << 1 | c8 >>> 31)
    s[6] ^= h
    s[7] ^= l
    s[16] ^= h
    s[17] ^= l
    s[26] ^= h
    s[27] ^= l
    s[36] ^= h
    s[37] ^= l
    s[46] ^= h
    s[47] ^= l
    h = c6 ^ (c0 << 1 | c1 >>> 31)
    l = c7 ^ (c1 << 1 | c0 >>> 31)
    s[8] ^= h
    s[9] ^= l
    s[18] ^= h
    s[19] ^= l
    s[28] ^= h
    s[29] ^= l
    s[38] ^= h
    s[39] ^= l
    s[48] ^= h
    s[49] ^= l

    b0 = s[0]
    b1 = s[1]
    b32 = s[11] << 4 | s[10] >>> 28
    b33 = s[10] << 4 | s[11] >>> 28
    b14 = s[20] << 3 | s[21] >>> 29
    b15 = s[21] << 3 | s[20] >>> 29
    b46 = s[31] << 9 | s[30] >>> 23
    b47 = s[30] << 9 | s[31] >>> 23
    b28 = s[40] << 18 | s[41] >>> 14
    b29 = s[41] << 18 | s[40] >>> 14
    b20 = s[2] << 1 | s[3] >>> 31
    b21 = s[3] << 1 | s[2] >>> 31
    b2 = s[13] << 12 | s[12] >>> 20
    b3 = s[12] << 12 | s[13] >>> 20
    b34 = s[22] << 10 | s[23] >>> 22
    b35 = s[23] << 10 | s[22] >>> 22
    b16 = s[33] << 13 | s[32] >>> 19
    b17 = s[32] << 13 | s[33] >>> 19
    b48 = s[42] << 2 | s[43] >>> 30
    b49 = s[43] << 2 | s[42] >>> 30
    b40 = s[5] << 30 | s[4] >>> 2
    b41 = s[4] << 30 | s[5] >>> 2
    b22 = s[14] << 6 | s[15] >>> 26
    b23 = s[15] << 6 | s[14] >>> 26
    b4 = s[25] << 11 | s[24] >>> 21
    b5 = s[24] << 11 | s[25] >>> 21
    b36 = s[34] << 15 | s[35] >>> 17
    b37 = s[35] << 15 | s[34] >>> 17
    b18 = s[45] << 29 | s[44] >>> 3
    b19 = s[44] << 29 | s[45] >>> 3
    b10 = s[6] << 28 | s[7] >>> 4
    b11 = s[7] << 28 | s[6] >>> 4
    b42 = s[17] << 23 | s[16] >>> 9
    b43 = s[16] << 23 | s[17] >>> 9
    b24 = s[26] << 25 | s[27] >>> 7
    b25 = s[27] << 25 | s[26] >>> 7
    b6 = s[36] << 21 | s[37] >>> 11
    b7 = s[37] << 21 | s[36] >>> 11
    b38 = s[47] << 24 | s[46] >>> 8
    b39 = s[46] << 24 | s[47] >>> 8
    b30 = s[8] << 27 | s[9] >>> 5
    b31 = s[9] << 27 | s[8] >>> 5
    b12 = s[18] << 20 | s[19] >>> 12
    b13 = s[19] << 20 | s[18] >>> 12
    b44 = s[29] << 7 | s[28] >>> 25
    b45 = s[28] << 7 | s[29] >>> 25
    b26 = s[38] << 8 | s[39] >>> 24
    b27 = s[39] << 8 | s[38] >>> 24
    b8 = s[48] << 14 | s[49] >>> 18
    b9 = s[49] << 14 | s[48] >>> 18

    s[0] = b0 ^ ~b2 & b4
    s[1] = b1 ^ ~b3 & b5
    s[10] = b10 ^ ~b12 & b14
    s[11] = b11 ^ ~b13 & b15
    s[20] = b20 ^ ~b22 & b24
    s[21] = b21 ^ ~b23 & b25
    s[30] = b30 ^ ~b32 & b34
    s[31] = b31 ^ ~b33 & b35
    s[40] = b40 ^ ~b42 & b44
    s[41] = b41 ^ ~b43 & b45
    s[2] = b2 ^ ~b4 & b6
    s[3] = b3 ^ ~b5 & b7
    s[12] = b12 ^ ~b14 & b16
    s[13] = b13 ^ ~b15 & b17
    s[22] = b22 ^ ~b24 & b26
    s[23] = b23 ^ ~b25 & b27
    s[32] = b32 ^ ~b34 & b36
    s[33] = b33 ^ ~b35 & b37
    s[42] = b42 ^ ~b44 & b46
    s[43] = b43 ^ ~b45 & b47
    s[4] = b4 ^ ~b6 & b8
    s[5] = b5 ^ ~b7 & b9
    s[14] = b14 ^ ~b16 & b18
    s[15] = b15 ^ ~b17 & b19
    s[24] = b24 ^ ~b26 & b28
    s[25] = b25 ^ ~b27 & b29
    s[34] = b34 ^ ~b36 & b38
    s[35] = b35 ^ ~b37 & b39
    s[44] = b44 ^ ~b46 & b48
    s[45] = b45 ^ ~b47 & b49
    s[6] = b6 ^ ~b8 & b0
    s[7] = b7 ^ ~b9 & b1
    s[16] = b16 ^ ~b18 & b10
    s[17] = b17 ^ ~b19 & b11
    s[26] = b26 ^ ~b28 & b20
    s[27] = b27 ^ ~b29 & b21
    s[36] = b36 ^ ~b38 & b30
    s[37] = b37 ^ ~b39 & b31
    s[46] = b46 ^ ~b48 & b40
    s[47] = b47 ^ ~b49 & b41
    s[8] = b8 ^ ~b0 & b2
    s[9] = b9 ^ ~b1 & b3
    s[18] = b18 ^ ~b10 & b12
    s[19] = b19 ^ ~b11 & b13
    s[28] = b28 ^ ~b20 & b22
    s[29] = b29 ^ ~b21 & b23
    s[38] = b38 ^ ~b30 & b32
    s[39] = b39 ^ ~b31 & b33
    s[48] = b48 ^ ~b40 & b42
    s[49] = b49 ^ ~b41 & b43

    s[0] ^= RC[n]
    s[1] ^= RC[n + 1]
  }
}

function keccak (bits) {
  return function (str) {
    var msg
    if (str.slice(0, 2) === '0x') {
      msg = []
      for (var i = 2, l = str.length; i < l; i += 2) {
        msg.push(parseInt(str.slice(i, i + 2), 16))
      }
    } else {
      msg = str
    }
    return update(Keccak(bits, bits), msg)
  }
}

const keccak256 = keccak(256)

function encode (tree) {
  var padEven = function padEven (str) {
    return str.length % 2 === 0 ? str : '0' + str
  }

  var uint = function uint (num) {
    return padEven(num.toString(16))
  }

  var length = function length (len, add) {
    return len < 56 ? uint(add + len) : uint(add + uint(len).length / 2 + 55) + uint(len)
  }

  var dataTree = function dataTree (tree) {
    if (typeof tree === 'string') {
      var hex = tree.slice(2)
      var pre = hex.length !== 2 || hex >= '80' ? length(hex.length / 2, 128) : ''
      return pre + hex
    } else {
      var _hex = tree.map(dataTree).join('')
      var _pre = length(_hex.length / 2, 192)
      return _pre + _hex
    }
  }

  return '0x' + dataTree(tree)
}

/* eslint-disable */
var secp256k1 = new elliptic.ec('secp256k1')
/* eslint-enable */
function makeSigner (addToV) {
  return function (hash, privateKey) {
    var signature = secp256k1.keyFromPrivate(Buffer.from(privateKey.slice(2), 'hex'))
      .sign(Buffer.from(hash.slice(2), 'hex'), {
        canonical: true
      })
    return [
      makeEven('0x' + (addToV + signature.recoveryParam).toString(16)),
      makeEven('0x' + signature.r.toString(16)),
      makeEven('0x' + signature.s.toString(16))
    ]
  }
}

function makeEven (hex) {
  if (hex.length % 2 === 1) {
    hex = hex.replace('0x', '0x0')
  }
  return hex
}

function genData (likeIndex) {
  return '0x078c478b' + (likeIndex % 256).toString(16).padStart(64, '0')
}

const chainId = 19330
const chainIdHex = makeEven('0x' + chainId.toString(16))
const contractAddr = '0x734B9306d463B409a8125De53C759703ADBDBb68'
const signer = makeSigner(2 * chainId + 35)

export const like = function like (likeIndex) {
  const data = genData(likeIndex)
  let fromPriv = '0x'
  for (let i = 0; i < 64; i++) {
    fromPriv += Math.floor(Math.random() * 16).toString(16)
  }
  const basicTxData = [
    '0x', // nonce
    '0x0f4240', // gasPrice
    '0x030d40', // gas
    contractAddr, // to
    '0x', // value
    data, // data
    '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf', // payment
    '0x' // fee
  ]
  const chainData = [
    chainIdHex, // chainId
    '0x',
    '0x'
  ]
  const rlpEncoded = encode([].concat(basicTxData, chainData))
  const signature = signer(keccak256(rlpEncoded), fromPriv)

  const rawTx = encode([].concat(basicTxData, signature, chainData))
  const paymentSignature = signer(keccak256(rawTx), '0x01')

  const trueTx = encode([].concat(basicTxData, signature, paymentSignature))

  if (fetch) {
    return fetch('https://api.truescan.net/rpc', {
      body: JSON.stringify({
        id: Math.floor(Math.random() * 10000),
        jsonrpc: '2.0',
        method: 'etrue_sendTrueRawTransaction',
        params: [trueTx]
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  } else {
    return Promise.reject('no fetch function finded')
  }
}

export const likeCount = function likeCount () {
  if (fetch) {
    return fetch('https://api.truescan.net/rpc', {
      body: JSON.stringify({
        id: Math.floor(Math.random() * 10000),
        jsonrpc: '2.0',
        method: 'etrue_call',
        params: [{
          data: '0x5a9b0b89',
          to: contractAddr
        }, 'latest']
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        throw new Error('network error')
      }
    }).then(data => {
      if (data && data.result !== '0x') {
        const hexNumber = data.result.substr(130, 320).match(/[0-9a-fA-F]{64}/g)
        return hexNumber.map(hex => Number('0x' + hex))
      } else {
        throw new Error('no data')
      }
    }).catch(err => {
      console.error(err)
      return [0, 0, 0, 0, 0]
    })
  } else {
    return Promise.reject('no fetch function finded')
  }
}
