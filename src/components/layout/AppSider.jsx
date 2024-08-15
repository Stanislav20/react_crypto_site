import { Layout, Card, Statistic, List, Typography, Tag} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from 'react'
import { capitalize } from '../utils'
import CryptoContext from '../context/Crypto-context'

const siderStyle = {
  padding: '1rem',
};

function AppSider () {
	const { assets } = useContext(CryptoContext)
		
	return (
		<Layout.Sider width="35%" style={siderStyle}>
			{
				assets.map(asset => (
					<Card style={{marginBottom: 20}}>
					
      			<Statistic
        		  title={capitalize(asset.id)}
        		  value={asset.price}
        		  precision={2}
        		  valueStyle={asset.grow ? { color: '#3f8600' } : { color: '#cf1322' }}
        		  prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        		  suffix="$"
        		/>
        		<List
        			size='small'
      				dataSource={[
      					{title: "Total profit", value: asset.totalProfit, withTag: true},
      					{title: "Total amount", value: asset.amount, isPlane: true},
      					{title: "Difference", value: asset.growPercent},
      				]}
      				renderItem={(item) => (
        				<List.Item >
          				<span>{item.title}</span>
          				<span>
          				{item.isPlane && item.value}
          				{item.withTag && <Tag color={asset.grow ? "green": "red"}>{asset.growPercent}%</Tag>}
          				{!item.isPlane && <Typography.Text type={asset.grow ? "success": "danger"}>{item.value}$</Typography.Text>}
          				</span>
        				</List.Item>
      				)}
    				/>
    			</Card>
				))
			}
    </Layout.Sider>
	)
}

export default AppSider