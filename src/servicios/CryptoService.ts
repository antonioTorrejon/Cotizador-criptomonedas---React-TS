import axios from "axios"
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../esquema/cripto-esquema"
import { Pair } from "../types"

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: {Data}} = await axios(url)
    const resultado = CryptoCurrenciesResponseSchema.safeParse(Data)
    
    if(resultado.success){
        return resultado.data
    }
}

export async function fetchCurrentCryptoPrice (pair: Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`
    const { data: {DISPLAY} } = await axios(url)

    const resultado = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptocurrency][pair.currency])
    if(resultado.success){
        return resultado.data
    }
}