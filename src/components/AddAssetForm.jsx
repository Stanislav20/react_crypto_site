import { useState } from 'react';
import { Select, Space, Typography, Divider, Flex, Form, Button, InputNumber, DatePicker, Result } from 'antd';
import { useCrypto } from './context/Crypto-context';
import CoinInfo from './CoinInfo'

const validateMessages = {
  required: '${label} is required!',
  types: {
  	number: '${label} is not valid number',
  },
  number: {
  	range: '${label} must be between ${min} and ${max}',
	},
}

export default function AddAssetForm ({ onClose }) {
	const { cryptoData } = useCrypto();
	const [coin, setCoin] = useState(null)
	const [submitted, setSubmitted] = useState(false)
	const [form] = Form.useForm();
	
	if(submitted) {
		return(
			<Result
    status="success"
    title="Asset Added!"
    subTitle={`Add ${24} of ${coin.name} price: ${40}`}
    extra={[
      <Button type="primary" key="close" onClick={onClose}>
        Close
      </Button>,
    ]}
  />
		)
	}
	
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
		console.log(`values : ${values}`)
		setSubmitted(true)
	}	
		
	function handleAmountChange(value) {
		const price = form.getFieldValue("price")
		form.setFieldsValue({
			total: +((value*price).toFixed(2))
		})
	}
		
	function handlePriceChange(value) {
		const amount = form.getFieldValue("amount")
		form.setFieldsValue({
			total: +((value*amount).toFixed(2))
		})
	}
		
	return (
			<Form
				form={form}
		    name="basic"
		    labelCol={{ span: 4 }}
		    wrapperCol={{ span: 30 }}
		    style={{ maxWidth: 600 }}
		    initialValues={{ price: +coin.price.toFixed(2) }}
		    onFinish={onFinish}
		    validateMessages={validateMessages}
  		>
				<CoinInfo coin={coin} />
				<Divider />

		    <Form.Item
		      label="Amount"
		      name="amount"
		      rules={[
		        {
		          required: true,
		          type: 'number',
		          min: 0,
		          //message: 'Please input your username!',
		        },
		      ]}
		    >
		      <InputNumber placeholder="Enter to coin amount..." onChange={handleAmountChange} style={{ width: '100%' }} />
		    </Form.Item>

				<Form.Item label="Date & time" name="date & time">
		      <DatePicker showTime style={{ width: '100%' }} />
		    </Form.Item>

		    <Form.Item label="Price" name="price">
		      <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
		    </Form.Item>
		    
		    <Form.Item label="Total" name="total">
		      <InputNumber disabled style={{ width: '100%' }} />
		    </Form.Item>

		    <Form.Item>
		      <Button type="primary" htmlType="submit">
		        Add asset
		      </Button>
		    </Form.Item>
  		</Form>
		)
	
}