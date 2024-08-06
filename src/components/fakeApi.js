import { cryptoData, cryptoAssets } from '../data.js'

export function fakeFetchCryptoData () {
	return new Promise ((resolve)=> {
		setTimeout(()=> {
			resolve(cryptoData)
		}, 2000);
	})
}

export function fakeFetchCryptoAssets () {
	return new Promise ((resolve) => {
		setTimeout(() => {
			resolve(cryptoAssets)
		}, 2000)
	})
}

//hello