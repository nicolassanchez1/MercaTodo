import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useHistory, useParams } from 'react-router'
import * as Server from '../home/Server'
import './ProductsForm.css'

const ProductsForm = () => {

    const initialState = {prod_id: 0, prod_description:"", prod_unit_price:0 ,prod_stock:0, cat_id:0}
    const params = useParams();

    const history = useHistory()
    const [product, setProduct] = useState(initialState)

    const handeleChange = (e) =>{
        setProduct({...product, [e.target.name] : e.target.value})
    }

    const handeleSubmit = async (e) => {
        e.preventDefault()
        try{
            let res;

            if(!params.id){
                res = await Server.addProduct(product);
                const data = await res.json();
                if(data.mesage === "Success"){
                    setProduct(initialState)
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Producto Agregado Correctamente ',
                    timer: 1500,
                    showConfirmButton: false,
                  })
            }else{
                await Server.update(params.id, product)

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    iconColor: 'white',
                    customClass: {
                      popup: 'colored-toast'
                    },
                    showConfirmButton: false,
                    timer: 2800,
                    timerProgressBar: true
                  })
                  await Toast.fire({
                    icon: 'success',
                    title: `Producto Actualizado:, ${product.prod_description}`
                  })
            }
            history.push('/')
        }catch(error){
            console.log(error)
        }
    }

    const getProduct = async (productId) => {
            try{
                const res = await Server.getProduct(productId)
                const data = await res.json();
                const {prod_description, prod_unit_price, prod_stock} = data.products
                setProduct({prod_description, prod_unit_price,prod_stock})
            }catch(error){
                console.log(error)
            }
    }

    useEffect(() => {
        if (params.id){
            getProduct(params.id)
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container">
            <div className="container-text">
                <p>{ params.id ? 'Actualizar Producto': 'Agregar Producto' }</p>
            </div>
            <div className="row">
                <div className="col">
                    <form action="" />
                    <label htmlFor="">Nombre del producto</label>
                    <input type="text" className="form-control mb-3" name="prod_description" value={product.prod_description} onChange={handeleChange} />
                    <label htmlFor="">Precio del producto</label>
                    <input type="number" className="form-control mb-3" name="prod_unit_price" value={product.prod_unit_price} onChange={handeleChange} />
                    <label htmlFor="">Stock del producto</label>
                    <input type="number" className="form-control" name="prod_stock" value={product.prod_stock} onChange={handeleChange} />
                    <button className="btn btn-dark mt-3" onClick={handeleSubmit}> { params.id ? 'Actualizar': 'Agregar Producto'}</button>
                </div>
            </div>
        </div>
    )
}

export default ProductsForm
