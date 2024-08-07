import { useState } from 'react';
import { Layout, Button, Select, Space, Modal } from 'antd';
import { useCrypto } from '../context/Crypto-context';

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
	const [ modal, setModal ] = useState(false)
	const { cryptoData } = useCrypto()
	
	function handleSelect(value) {
  	console.log(`selected ${value}`);
  	setModal(true)
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
			<Button type="primary">Primary Button</Button>
			
			<Modal 
				title="Basic modal"
				open={modal} 
				onOk={() => setModal(false)} 
				onCancel={() => setModal(false)}
				//footer="null"
				>
				
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
		</Layout.Header>
	)
}

export default AppHeader
