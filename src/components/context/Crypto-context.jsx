import { useState, useEffect, createContext, useContext } from 'react'
import { fakeFetchCryptoData, fakeFetchCryptoAssets} from '../fakeApi.js';
import { percentDifference } from '../utils.js'

const CryptoContext = createContext({ //базовые значения у контекста
	assets: [],
	cryptoData: [],
	loading: false,
})

function mapAssets(assets, cryptoData) {
	return assets.map(asset => {
		const coin = cryptoData.find((c)=> c.id === asset.id)
		return {
			grow: asset.price < coin.price,//рост монетки, да или нет
			growPercent: percentDifference(asset.price, coin.price).toFixed(2), //разница в процентах
			totalAmount: (asset.amount * coin.price).toFixed(2), //количество денег в монетках
			totalProfit: (asset.amount * coin.price - asset.amount * asset.price).toFixed(2), //сколько заработали на изменении курса стоимости монетки
			name: coin.name,
			...asset,
		}
	})
}

export function CryptoContextProvider({children}) {  //в этом компоненте лежат все данные и переменные
	const [loading, setLoading] = useState(false)			 //которые будут храниться в контексте.
	const [cryptoData, setCryptoData] = useState([])
	const [assets, setAssets] = useState([])
	
useEffect(()=> {
		async function preload(){  //здесь создаем функцию которая имитирует запрос на сервер, на получение информации о криптовалютах.
			setLoading(true)
			const {result} = await fakeFetchCryptoData()  //получение информации о всех криптовалютах
			const assets = await fakeFetchCryptoAssets()  //получение информации о криптовалюте которая есть в моем портфеле.
			
			setAssets(mapAssets(assets, result))
			setCryptoData(result)  
			setLoading(false)  //исчезновение окна загрузки после получения данных.
		}
		preload()  //сразу после объявления, вызывается функция при первичном рендеринге страницы.
},[])
	
function addAsset(newAsset) {
	setAssets(prev => mapAssets([...prev, newAsset], cryptoData))
}
	
	return <CryptoContext.Provider value={{assets, cryptoData, loading, addAsset}}>{children}</CryptoContext.Provider> //в value записаны переменные которые 
}																																																										 //передаются к дочерним компонентам через контекст.

export default CryptoContext;

export function useCrypto() {
	return useContext(CryptoContext)
}