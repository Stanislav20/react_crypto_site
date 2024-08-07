import AppLayout from './components/layout/AppLayout'
import { CryptoContextProvider } from './components/context/Crypto-context'

export default function App() {
  return (
  	<CryptoContextProvider>
			<AppLayout />
    </CryptoContextProvider>
  )
}
