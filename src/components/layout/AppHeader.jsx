import { useState } from 'react';
import { Layout, Button, Select, Space, Modal, Drawer } from 'antd';
import { useCrypto } from '../context/Crypto-context';
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

const headerStyle = {
  wigth: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  padding: '1rem',
  backgroundColor: '#4096ff',
  color: '#fff'
};

function AppHeader () {
	const [modal, setModal] = useState(false)
	const [coin, setCoin] = useState(null)
	const [drawer, setDrawer] = useState(false)
	const { cryptoData } = useCrypto()
	
	function handleSelect(value) {
  	console.log(`selected ${value}`);
  	setModal(true)
  	setCoin(cryptoData.find(c => c.id === value))
	};
  
	return (
		<Layout.Header style={headerStyle}>
			<Select
		    style={{
		      width: '250px',
		    }}
		    onSelect={handleSelect}
		    defaultValue="press / to open"
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
			<Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
			
			<Modal 
				open={modal} 
				onCancel={() => setModal(false)}
				footer={null}
			>
				<CoinInfoModal coin={coin}/>
      </Modal>
      
      <Drawer  title="Add Asset" onClose={() => setDrawer(false)} open={drawer}>
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
		</Layout.Header>
	)
}

export default AppHeader
