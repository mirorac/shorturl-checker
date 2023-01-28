import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from 'firebase/functions'
import { app } from './app'
const functions = getFunctions(app)
// connect to emulator in dev environment
if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, 'localhost', 5173)
}
type CheckUrlData = {
  type: 'url'
  url: string
}
type CheckSSLData = {
  type: 'ssl'
  hostname: string
}
export const check = httpsCallable<
  CheckUrlData | CheckSSLData,
  Record<string, string>
>(functions, 'check')
