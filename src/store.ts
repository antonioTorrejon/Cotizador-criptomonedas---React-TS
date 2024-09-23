import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { CryptoCurrency, CryptoPrice, Pair } from "./types"
import { getCryptos, fetchCurrentCryptoPrice } from "./servicios/CryptoService"

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[]
    resultado: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    resultado: {
        IMAGEURL : '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },
    fetchData: async (pair) =>{
        set(() => ({
            loading: true
        }))
        const resultado = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            resultado,
            loading: false
        }))
    }
})))