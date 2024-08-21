import { Layout, Typography } from 'antd';
import { useCrypto } from '../context/Crypto-context'
import PortfolioChart from './PortfolioChart'
import AssetsTable from './AssetsTable'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

function AppContent () {
	const { assets, cryptoData } = useCrypto()
	
	const totalCrypto = assets.map((asset) => {
		const coin = cryptoData.find(c => c.id === asset.id)
		return asset.amount * coin.price
	})
	.reduce((acc,v) => (acc += v), 0)
	.toFixed(2)
	
	
	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title level={3} style={{color: '#fff', textAlign: 'left'}}>Portfolio: {totalCrypto}$</Typography.Title>
			<PortfolioChart />
			<AssetsTable />
		</Layout.Content>
	)
}

export default AppContent
