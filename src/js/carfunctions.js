const updateCar = document.querySelector("#updateCar")
const updateColorCar = document.querySelector("#updateColorCar")
const updateCarBtn = document.querySelector("#updateCarBtn")

import { fetchData } from "./reqest"
import { render } from "./render"

// method="GET", url, data

// select
const selectCar = (id) => {
    fetchData("GET", `http://127.0.0.1:3000/garage/${id}`, null).then((data) => {
      const {name, color, id} = data
        updateCar.value = name
        updateColorCar.value = color
    })

    updateCarBtn.addEventListener('click', () => {
       const newName = updateCar.value 
       const newColor = updateColorCar.value
       const data = {
       name: newName, color: newColor
       }

        fetchData("PUT", `http://127.0.0.1:3000/garage/${id}`, data).then((data) => {
            render()
        })
    })
}

// start
const startCar = (id, color) => {
    console.log(id)
    fetchData("PATCH", `http://127.0.0.1:3000/engine?id=${id}&status=started`, null).then((data) => {
       driveCar(data,id, color)
    })

    // run
}

const stopCar = (id , raceErr, color) => {
    fetchData("PATCH", `http://127.0.0.1:3000/engine?id=${id}&status=stopped`, null).then((data) => {
        const car =  document.querySelector("#car" + `${id}`)
        if (raceErr) {
            car.style = `
             animation-play-state: paused !important;
             color:${color}
            `
        }
     })
}


// delete
const deleteCar = (id) => {
    fetchData("DELETE", `http://127.0.0.1:3000/garage/${id}`, null).then((data) => {
        render()
     })
}


 function driveCar (data,id, color) {
    console.log(data,color)
    const {velocity, distance } =  data
       const time = Math.round((distance / velocity)  / 1000)
       const car =  document.querySelector("#car" + `${id}`)
       car.style = `
        animation: runcar ${time}s linear forwards;
        animation-play-state: running;
        color: ${color}
       `
}




export { selectCar, startCar, deleteCar, stopCar, driveCar }