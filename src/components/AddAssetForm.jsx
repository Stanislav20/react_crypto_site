import { useState } from 'react';
import { Select, Space, Typography, Divider, Flex, Form, Button, InputNumber } from 'antd';
import { useCrypto } from './context/Crypto-context';

export default function AddAssetForm () {
	const { cryptoData } = useCrypto();
	const [coin, setCoin] = useState(null)
	
	if (!coin) {
		return (
			<Select
		    style={{ width: '250px' }}
		    onSelect={(value) => setCoin(cryptoData.find((c) => c.id === value))}
		    placeholder="Select coin"
		    options={cryptoData.map((coin) => ({
		    	value: coin.id,
		    	label: coin.name,
		    	icon: coin.icon,
		    }))}
		    optionRender={(option) => (
		      <Space>
		        <img style={{	width: '20px' }}
		    			src={option.data.icon} /> {option.data.label}
		      </Space>
		    )}
	  	/>
	 )}
		
	function onFinish (values) {
		//alert(`values : ${values}`)
		console.log(`values : ${values}`)
	}	
		
	return (
			<Form
		    name="basic"
		    labelCol={{ span: 4 }}
		    wrapperCol={{ span: 30 }}
		    style={{ maxWidth: 600 }}
		    initialValues={{ }}
		    onFinish={onFinish}
  		>
				<Flex align='center'>
					<img style={{ width: 40 , marginRight: 10 }} src={coin.icon} alt={coin.name} />
					<Typography.Title level={2} style={{ margin: 0 }} >{coin.name}</Typography.Title>
				</Flex>
				<Divider />

		    <Form.Item
		      label="Amount"
		      name="amount"
		      rules={[
		        {
		          required: true,
		          type: 'number',
		          min: 0,
		          message: 'Please input your username!',
		        },
		      ]}
		    >
		      <InputNumber />
		    </Form.Item>

		    <Form.Item
		      label="Price"
		      name="price"
		    >
		      <InputNumber />
		    </Form.Item>

		    <Form.Item>
		      <Button type="primary" htmlType="submit">
		        Add asset
		      </Button>
		    </Form.Item>
  		</Form>
		)
	
}