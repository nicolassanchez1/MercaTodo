import React, { useState } from 'react'
import {
    Switch,
    Route,
    useLocation
} from "react-router-dom";
import ProductsForm from './components/productsForm/ProductsForm';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Header from './components/header/Header'
import Spinner from './components/spinner/Spinner';

const App = () => {
    const { pathname } = useLocation();
    const [isLogin, setisLogin] = useState(false)
    const [credentials, setCredentials] = useState({ user: '', password: '' });
    const [cargando, guardarSpinner] = useState(false)

    let componentes;
    if (cargando) {
        componentes = <Spinner />
    }
    return (

        <>
            {pathname !== "/login" && (<Header
                isLogin={isLogin}
                setisLogin={setisLogin}
                credentials={credentials}
                setCredentials={setCredentials}
            />)}
            <Switch>
                {/* <Home /> */}
                <Route exact path="/">
                    <Home
                        isLogin={isLogin}
                        setisLogin={setisLogin}
                        credentials={credentials}
                        setCredentials={setCredentials}
                    />
                </Route>
                <Route path="/agregar" component={ProductsForm} />
                <Route path="/update/:id" component={ProductsForm} />
                <Route path="/login">
                    <Login
                        isLogin={isLogin}
                        setisLogin={setisLogin}
                        credentials={credentials}
                        setCredentials={setCredentials}
                        guardarSpinner={guardarSpinner}
                        cargando={cargando}
                    />
                </Route>
            </Switch>
            <div className="mensajes">
                {componentes}
            </div>
        </>
    )
}

export default App
