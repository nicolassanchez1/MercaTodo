import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import './Login.css'
const Login = ({ isLogin, setisLogin, credentials, setCredentials, guardarSpinner, cargando }) => {

    const history = useHistory()
    const [error, setError] = useState(false)
    const { user, password } = credentials;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value })
    }
    const isCorrectUser = () => {


        if (user === 'admin' && password === '123456') {
            setisLogin(true);
            setError(false);
            Swal.fire({
                icon: 'success',
                title: `Iniciaste Sesion con el usario <b>${user}</b>`,
                showConfirmButton: false,
                timer: 2000
              })
            history.push('/');
        } else {
            console.log('datos invalidos')
            setisLogin(false)
            setError(true)
            setCredentials({ user: '', password: '' })
        }



    }


    console.log('error', error)
    const handeleSubmit = (e) => {
        e.preventDefault();
        guardarSpinner(true)
        setTimeout(() => {
            if (!user || !password) {
                setisLogin(false);
                console.log('ingrese sus datos')
                guardarSpinner(false)


            } else {
                isCorrectUser();
                guardarSpinner(false)
            }
        }, 2000)
    }
    console.log('Spinner', cargando)
    return (
        <div className="login" id="login" >
            <img src="../../assets/img/pngwing.com.png" id="monster" alt="" width="400" />
            <form action="" className="form">
                <i className="fas fa-shopping-basket canasta"></i>
                <p className="text-login">Bienvenido a mercatodo</p>
                <label htmlFor="">Usuario</label>
                <input
                    type="text"
                    placeholder="Nicolás"
                    name="user"
                    id="user"
                    value={credentials.user}
                    onChange={handleChange}
                />
                <label htmlFor="">Contraseña</label>
                <input
                    type="password"
                    placeholder="*********"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                {
                    error ? <p className="error">El usuario o la contraseña son incorretos</p> : null
                }
                <button
                    type="submit"
                    className="btn-login"
                    onClick={handeleSubmit}
                >Login</button>
            </form>
        </div>
    )
}

export default Login
