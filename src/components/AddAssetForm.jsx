import { useState } from 'react';
import { Select, Space, Typography} from 'antd';
import { useCrypto } from './context/Crypto-context';

export default function AddAssetForm () {
	const { cryptoData } = useCrypto();
	const [coin, setCoin] = useState(null)
	
	if (!coin) {
		return (
			<Select
		    style={{
		      width: '250px',
		    }}
		    onSelect={(value) => setCoin(cryptoData.find((c) => c.id === value))}
		    placeholder="Select coin"
		    options={cryptoData.map((coin) => ({
		    	value: coin.id,
		    	label: coin.name,
		    	icon: coin.icon,
		    }))}
		    optionRender={(option) => (
		      <Space>
		        <img style={{
		      		width: '20px',
		    		}}
		    			src={option.data.icon} /> {option.data.label}
		      </Space>
		    )}
	  	/>
	 )}
		
	else {
		return (
			<form>
				<Typography.Title level={2} style={{ margin: 0 }} >{coin.name}</Typography.Title>
			</form>)
	}
}