import {useEffect, useState, createContext} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);    
    const [nombre, setNombre] = useState('');  
    const [total, setTotal] = useState(0);  
    
    const router = useRouter()

    const obtenerCategorias = async ()=>{
        const {data} = await axios.get('/api/categorias')
        //console.log(data)
        setCategorias(data)
    }
    useEffect(() => {
        obtenerCategorias()
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias]);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto)=> ( producto.precio * producto.cantidad) + total, 0)

        setTotal(nuevoTotal);
    }, [pedido]);

    const handleClickCategoria = (id) =>{
        //console.log(id)
        const categoria = categorias.filter(cat => cat.id === id)
        //console.log(categoria[0])
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = (producto)=>{
        setProducto(producto)
    }

    const handleChangeModal = ()=>{
        setModal(!modal)
    }    

    const handleAgregarPedido = ({categoriaId, ...producto}) =>{
        //console.log(producto)
        if(pedido.some(productoState => productoState.id === producto.id )){
            //console.log('El pedido ya existe')
            //Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        }else{
            //console.log('El pedido no existe')
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
        setModal(false)        
    }

    const handleEditarCantidades = (id) =>{
        //console.log(id)
        const productoActualizar = pedido.filter((producto) => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = (id) =>{
        //console.log(id)
        const pedidoActualizado = pedido.filter((producto) => producto.id !== id)        
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            //Resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)      
            
            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/')
            }, 5000);

        } catch (error) {
            console.error(error)
        }
        // console.log(pedido)
        // console.log(nombre)
        // console.log(total)
    }
 

  return (
    <QuioscoContext.Provider
        value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            handleSetProducto,
            modal,
            handleChangeModal,
            pedido,
            handleAgregarPedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total          
        }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export {
    QuioscoProvider
}

export default QuioscoContext
