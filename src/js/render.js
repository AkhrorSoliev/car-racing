import { fetchData } from './reqest'
import { createCarToUI } from './updateUI'

const render = () => {
    fetchData("GET", 'http://127.0.0.1:3000/garage', null).then((data) => {
        createCarToUI(data)
    })

}

export {render}