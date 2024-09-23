import { useCryptoStore } from "../store"
import { currencies } from "../data"
import { useState, ChangeEvent, FormEvent } from "react"
import { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"


export default function Formulario() {

    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)
    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptocurrency: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name] : e.target.value
        })

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')

        //Consultar la API

        fetchData(pair)
    }

    return (
        <form 
            className="formulario"
            onSubmit={handleSubmit}
        >
            <div className="campo">
                <label htmlFor="currency">Moneda</label>
                <select 
                    name="currency" 
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                >
                    <option value="">-- Seleccione --</option>
                    {currencies.map(currency => (
                        <option 
                            value={currency.code}
                            key={currency.code}
                        >
                            {currency.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="campo">
                <label htmlFor="cryptocurrency">Criptomoneda</label>
                <select 
                    name="cryptocurrency" 
                    id="cryptocurrency"
                    onChange={handleChange}
                    value={pair.cryptocurrency}
                >
                    <option value="">-- Seleccione --</option>
                    {cryptocurrencies.map(crypto => (
                        <option
                            key={crypto.CoinInfo.Name}
                            value={crypto.CoinInfo.Name}
                        >{crypto.CoinInfo.FullName}</option>
                    ))}
                </select>

                {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>

            <input type="submit" value="Cotizar" />
        </form>
    )
}
