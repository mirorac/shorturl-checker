import * as functions from 'firebase-functions'

export const check = functions.https.onCall(async (data, context) => {
  return await (await import('./services/http')).default(data, context)
})
