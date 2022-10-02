import Image from 'next/image'
import {formatearDinero} from '../helpers/index'
import useQuiosco from '../hooks/useQuiosco'

const Producto = ({producto}) => {

    const {imagen, precio, nombre} = producto
    const {handleSetProducto, handleChangeModal} = useQuiosco()
    
  return (
    <div className=' border p-3 rounded-lg'>
      <Image
        width={400}
        height={500}
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${nombre}`}        
      ></Image>
      <h3 className=' text-2xl font-bold'>{nombre}</h3>
      <p className=' mt-5 font-black text-4xl text-amber-500'>{formatearDinero(precio)}</p>
      <button
        type='button'
        className=' bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-lg'
        onClick={ () => {
            handleSetProducto(producto)
            handleChangeModal()
        }}
      >Agregar</button>
    </div>
  )
}

export default Producto
