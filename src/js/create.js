const createANewCar = document.getElementById('createANewCar')
const createColorCar = document.getElementById('createColorCar')
const createCarBtn = document.getElementById('createCarBtn')

import { fetchData } from './reqest'
import { render } from './render'

createCarBtn.addEventListener('click', () => {
    const name = createANewCar.value
    const color = createColorCar.value
    const newCar = {name, color}
    
    fetchData("POST", 'http://localhost:3000/garage', newCar).then((data) => {
        render()
    }).catch((err) => {
        console.log(err)
    })
})