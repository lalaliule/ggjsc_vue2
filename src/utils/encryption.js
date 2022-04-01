require('./BizSecurity.js')

export function encryptParam(param) {
  const key1 = 'hs'
  const key2 = 'club'
  const key3 = '33#44'
  return BizSecurity.DES.encrypt(param, key1, key2, key3)
}
