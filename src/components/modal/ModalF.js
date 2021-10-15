import React, { } from 'react'
import Swal from 'sweetalert2'
import './Modal.css'
const ModalF = () => {


    const lunchModal = async () => {
        
        const { value: fruit } = await Swal.fire({
            title: 'Select a category',
            input: 'select',
            inputOptions: {
              'Frutas': {
                apples: 'Apples',
                bananas: 'Bananas',
                grapes: 'Grapes',
                oranges: 'Oranges'
              },
              'Carnes': {
                apples: 'Apples',
                bananas: 'Bananas',
                grapes: 'Grapes',
                oranges: 'Oranges'
              },
              'Verduras': {
                potato: 'Potato',
                broccoli: 'Broccoli',
                carrot: 'Carrot'
              },
            },
            inputPlaceholder: 'Selecciona alguna categoria',
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value) {
                  resolve()
                } else {
                  resolve('You need to select oranges :)')
                }
              })
            }
          })
          
          if (fruit) {
            Swal.fire(`You selected: ${fruit}`)
          }
    }
 
    return (

        <>

            <button 
            className="btn btn-primary mt-2"
            onClick={lunchModal}
            >Filtrar</button>

        </>

    )
}

export default ModalF
