import React from 'react'
import './Search.css'

const Search = ({ handeleChange, value }) => {

    return (
        <div className="containerSearch">
            <input
                type="text"
                onChange={handeleChange}
                value={value}
                placeholder="Buscar Producto"
                className="form-control searchBox"
            />
        </div>

    )
}

export default Search
