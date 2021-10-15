import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Header.css'
const Header = ({ setisLogin, isLogin, credentials, setCredentials }) => {

    const handeleClick = () => {
        Swal.fire({
            title: '¿Quieres Cerrar Sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar'
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: `Sesión Cerrada Exitosamente`,
                    showConfirmButton: false,
                    timer: 2000
                  })
                setisLogin(false)
                setCredentials(false)
            }
          })

    }

    return (
        <div className="d-flex justify-content-between align-items-center container-main mb-3">
            <Link to="/">
                <h2><i className="fas fa-shopping-basket"></i> MercaTodo</h2>
            </Link>

            {
                isLogin ? <Link to="/">
                    {
                        credentials ? <h4 className="text-sesion">Bienvenido <span>{credentials.user}</span> <button className="btn btn-danger" onClick={handeleClick}>Cerrar Sesion</button></h4> : <h4 className="text-sesion">Inicia Sesión <i className="fas fa-user-circle"></i></h4>
                    }
                </Link> 
                : <Link to="/login">
                    {
                        credentials === "" ? <h4 className="text-sesion">Bienvenido <span>{credentials.user}</span><button className="btn btn-danger" onClick={handeleClick}>Cerrar Sesion</button></h4> : <h4 className="text-sesion">Inicia Sesión <i className="fas fa-user-circle"></i></h4>
                    }
                </Link>
            }

        </div>
    )
}

export default Header
