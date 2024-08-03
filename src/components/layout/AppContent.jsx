import { Layout } from 'antd';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

function AppContent () {
	return (
		<Layout.Content style={contentStyle}>Content</Layout.Content>
	)
}

export default AppContent
