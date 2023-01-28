/**
 * API
 * Exposes endpoints
 */

// import * as functions from 'firebase-functions';
import * as functions from 'firebase-functions'
import * as https from 'https'
import * as tls from 'tls'

type Context = functions.https.CallableContext
type CheckUrlData = {
  type: 'url'
  url: string
}
type CheckSSLData = {
  type: 'ssl'
  hostname: string
}

type CheckSSLResponse = {
  authorized: boolean
  details: tls.PeerCertificate
}
// @ts-ignore
function checkSSLold(hostname) {
  console.log('Starting SSL check')
  const promise = new Promise<CheckSSLResponse>((resolve, reject) => {
    console.log('Making SSL connection')
    try {
      const client = tls.connect(
        443,
        hostname || 'google.com',
        {},
        function () {
          const certificate = client.getPeerCertificate()
          console.log(
            'Certificate is: ',
            JSON.parse(JSON.stringify(certificate))
          )
          if (certificate) {
            resolve({
              authorized: client.authorized,
              details: certificate,
            })
          } else {
            reject(new Error('no-certificate'))
          }
        }
      )
      client.on('error', (error) => {
        console.error(error)
      })
      client.end()
    } catch (e) {
      reject(new Error('fucked up'))
    }
  })
  return promise
}

function checkSSL(hostname) {
  console.log('Starting SSL check')
  const promise = new Promise<CheckSSLResponse>((resolve, reject) => {
    console.log('Making SSL connection')
    try {
      const options = {
        agent: false,
        method: 'HEAD',
        port: 443,
        rejectUnauthorized: false,
        hostname,
      }
      https
        .request(options, function (response) {
          // @ts-ignore
          const certificate = response.connection.getPeerCertificate()
          resolve({
            // @ts-ignore
            authorized: response.socket.authorized,
            details: certificate,
          })
        })
        .on('error', (e) => {
          reject(e)
        })
        .end()
    } catch (e) {
      reject(new Error('fucked up'))
    }
  })
  return promise
}

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    try {
      https
        .request(url, function (response) {
          resolve(response.headers)
        })
        .on('error', (e) => {
          reject(e)
        })
        .end()
    } catch (e) {
      reject(e)
    }
  })
}

export default async function (
  data: CheckUrlData | CheckSSLData,
  context: Context
) {
  console.log('Check function started with ', data)
  if (data.type == 'url') {
    return await checkUrl(data.url)
  } else if (data.type == 'ssl') {
    const certificate = await checkSSL(data.hostname).catch((error: Error) => {
      if (error.message == 'no-certificate') {
        throw new functions.https.HttpsError(
          'not-found',
          'The host failed to provide a certificate.'
        )
      } else {
        throw new functions.https.HttpsError(
          'internal',
          'An unknown error happened.'
        )
      }
    })
    return {
      hostname: data.hostname,
      ...certificate,
    }
  } else {
    throw new functions.https.HttpsError(
      'invalid-argument',
      "The function signature is (type: 'url', url: string) or (type: 'ssl', hostname: string)"
    )
  }
}
