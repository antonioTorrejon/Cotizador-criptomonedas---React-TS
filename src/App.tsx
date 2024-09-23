import { useEffect } from "react"
import Formulario from "./componentes/Formulario"
import { useCryptoStore } from "./store"
import CryptoPriceDisplay from "./componentes/CryptoPriceDisplay"

function App() {

    const fetchCryptos = useCryptoStore((state) => state.fetchCryptos)
    useEffect(() => {
        fetchCryptos()
    }, [])

    return (
        <div className="contenedor">
            <h1 className="app-titulo">
                Cotizador de <span>Criptomonedas</span>
            </h1>

            <div className="contenido">
                <Formulario />
                <CryptoPriceDisplay />
            </div>
        </div>
    )
}

export default App
