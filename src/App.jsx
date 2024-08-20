import AppLayout from './components/layout/AppLayout'
import { CryptoContextProvider } from './components/context/Crypto-context'

export default function App() {
  return (
  	<CryptoContextProvider>  //оборачиваем всë приложение в контекст, чтобы данные были доступны для любого компонента.
			<AppLayout />
    </CryptoContextProvider>
  )
}
