// import { Layout } from 'antd';
// import AppHeader from './components/layout/AppHeader'
// import AppSider from './components/layout/AppSider'
// import AppContent from './components/layout/AppContent'
import AppLayout from './components/layout/AppLayout'
import { CryptoContextProvider } from './components/context/CryptoContext'

export default function App() {
  return (
  	<CryptoContextProvider>
			<AppLayout />
  		{/* <Layout>
      	<AppHeader />
      	<Layout>
        	<AppSider />
        	<AppContent />
      	</Layout>
    	</Layout> */}
    </CryptoContextProvider>
  )
}
