import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinners from "./Spinners"

export default function CryptoPriceDisplay() {

    const resultado = useCryptoStore((state) => state.resultado)
    const loading = useCryptoStore((state) => state.loading)
    const hasResult = useMemo(() => !Object.values(resultado).includes('') , [resultado])

    return (
        <div className="resultado-wrapper">
            {loading ? <Spinners /> : hasResult && (
                <>
                    <h2>Cotización</h2>
                    <div className="resultado">
                        <img 
                            src={`https://cryptocompare.com/${resultado.IMAGEURL}`}
                            alt="Imagen criptomoneda"
                        />
                        <div>
                            <p>El precio es de: <span>{resultado.PRICE}</span></p>
                            <p>Precio máxima del día: <span>{resultado.HIGHDAY}</span></p>
                            <p>Precio mínimo del día: <span>{resultado.LOWDAY}</span></p>
                            <p>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></p>
                            <p>Última actualización: <span>{resultado.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
