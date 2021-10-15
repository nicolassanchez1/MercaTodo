import React, { useState, useEffect } from 'react'
import { Link, useHistory, } from 'react-router-dom';
import Search from '../Search/Search';
import ModalF from '../modal/ModalF'
import Swal from 'sweetalert2'
import * as Server from './Server'
import './Home.css'

const Home = ({isLogin}) => {
    const history = useHistory()
    const [products, setProducts] = useState([])
    const [products2, setProducts2] = useState([])
    const [value, setValue] = useState([])


    const listProducts = async () => {
        try {
            const res = await Server.listProducts();
            const data = await res.json()
            setProducts(data.products)
        } catch (error) {
            console.log(error)
        }
    }


    const listProducts2 = async () => {
        try {
            const res = await Server.listProducts();
            const data = await res.json()
            setProducts2(data.products)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        listProducts();
    }, [])

    useEffect(() => {
        listProducts2();
    }, [])

    const handeleDelete = async (id, name) => {
        Swal.fire ({
            title: 'Estas Seguro de eliminar',
            text: `${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result)  =>  {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    `Tu producto ${name} ha sido eliminado`,
                    'success'
                    )
                    listProducts()
                }
                
            })
           await Server.deletProduct(id);

        }

    const handeleChange = (e) => {
        if (e.target.value) {
            const filterData = products.filter(product => {
                if (product.prod_description.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return true
                }
                return false
            })
            setProducts(filterData)
        } else {
            setProducts(products2)
        }
        setValue(e.target.value)
    }
    return (
        <>
            <div className="container-buttons d-flex justify-content-between align-items-center flex-wrap mb-1">
                <ModalF />
                <Search handeleChange={handeleChange} value={value} />

                {
                    isLogin ?                <Link to="/agregar">
                    <button className="btn btn-primary mr-5">Agregar <br /> Producto + </button>
                </Link> : null
                }

            </div>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Descripción del producto</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Stock</th>
                                {
                                    isLogin ? <th scope="col">Acciones</th> : null
                                } 
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                    <tr key={product.prod_id}>
                                        <th>{product.prod_id}</th>
                                        <td>{product.prod_description}</td>
                                        <td>{product.prod_unit_price}</td>
                                        <td>{product.prod_stock} U/N</td>
                                        {
                                            isLogin ?                                         <td>
                                            <button type="button" onClick={() => history.push(`/update/${product.prod_id}`)} className="btn btn-dark"><i className="fas fa-edit"></i></button>
                                            <button type="button" onClick={() => product.prod_id && handeleDelete(product.prod_id, product.prod_description)} className="btn btn-danger"><i className="fas fa-trash"></i></button>

                                        </td> : null
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
        </>
            )
};
            export default Home;
