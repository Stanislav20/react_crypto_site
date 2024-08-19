import { useState, useEffect, createContext, useContext } from 'react'
import { fakeFetchCryptoData, fakeFetchCryptoAssets} from '../fakeApi.js';
import { percentDifference } from '../utils.js'

const CryptoContext = createContext({ //базовые значения у контекста
	assets: [],
	cryptoData: [],
	loading: false,
})

function mapAssets() {
	
}

export function CryptoContextProvider({children}) {
	const [loading, setLoading] = useState(false)
	const [cryptoData, setCryptoData] = useState([])
	const [assets, setAssets] = useState([])
	
	useEffect(()=> {
		async function preload(){
			setLoading(true)
			const {result} = await fakeFetchCryptoData()
			const assets = await fakeFetchCryptoAssets()
			
			setAssets(
				assets.map((asset)=> {
					const coin = result.find((c)=> c.id === asset.id)
					return {
						grow: asset.price < coin.price,//рост монетки, да или нет
						growPercent: percentDifference(asset.price, coin.price).toFixed(2), //разница в процентах
						totalAmount: (asset.amount * coin.price).toFixed(2), //количество денег в монетках
						totalProfit: (asset.amount * coin.price - asset.amount * asset.price).toFixed(2), //сколько заработали на изменении курса стоимости монетки
						...asset,
					}
				})
			)
			setCryptoData(result)
			setLoading(false)
		}
		preload()
	},[])
	
	function addAsset(newAsset) {
		setAssets(prev => [...prev, newAsset])
	}
	
	return <CryptoContext.Provider value={{assets, cryptoData, loading, addAsset}}>{children}</CryptoContext.Provider>
}

export default CryptoContext;

export function useCrypto() {
	return useContext(CryptoContext)
}