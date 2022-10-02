import ResumenProdunto from "../components/ResumenProdunto"
import useQuiosco from "../hooks/useQuiosco"
import Layout from "../Layout/Layout"

export default function Resumen(){

    const {pedido} = useQuiosco()
    return(
        <Layout pagina={'Resumen'}>
            <h1 className=" text-4xl font-black">Resumen</h1>
            <p className=" text-2xl my-10">Revisa tu pedido</p>

            {pedido.length === 0 ? (
                <p className=" text-center text-2xl">No hay elemento en tu pedido</p>
            ) : (
                pedido.map( (producto) =>(
                    <ResumenProdunto
                        key={producto.id}
                        producto={producto}
                    ></ResumenProdunto>
                ))
            )}
        </Layout>
    )
}
