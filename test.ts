/* eslint-disable prettier/prettier */
const CryptoTS = require('crypto-ts');

const PRIVATE_KEY = 'fdc44954218150fdb03854043a337b6881abc317a46bbc4b481c241b02595a4f629c0b00d27570705b495f5ea51473480d7c0774359415b642291c32745782176d6492f6e24ce9bb2f32960775a3cb3762fc58c7ca217de5ac70b6076662677e16ecdf1c27a2fec5fd03c4aac0c4ea41ed78a09110f8f9dc02079e7f96733a7d48210c7a98613aa4b681b6a178ef14c7003370e230322f6cfddff26f1298097d'

// Encrypt
export function encrypt(text: object) {
  const ciphertext = CryptoTS.AES.encrypt(JSON.stringify(text), PRIVATE_KEY).toString()
  console.log(ciphertext)
  return ciphertext;
}

// Decrypt
export function decrypt(encryptedMessage: string){
  const bytes = CryptoTS.AES.decrypt(encryptedMessage, PRIVATE_KEY).toString(CryptoTS.enc.Utf8);
  console.log(bytes.toString())
  const finalMessage = JSON.parse(bytes);
  console.log(finalMessage)
  return finalMessage;
}

console.log('test')


const data = {name: 'Emma',email: 'Emma@gmail.com',password: '123'}

const data2 = {id: '63ac83382a40b13d74c89386'}

const data3 = {email: 'jorge@gmail.com', password: 'JorgeJorge1'}

console.log(process.env.PRIVATE_KEY)

decrypt(encrypt(data3))

