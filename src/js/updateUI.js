import { selectCar , startCar, deleteCar, stopCar} from './carfunctions'

const carsListEl = document.getElementById("cars-list");


const createCarToUI = (carData) => {
  const carColors = []
  carsListEl.innerHTML = "";
  carData.forEach((car) => {
    const {color, id ,name } = car
    carColors.push(color)

    carsListEl.innerHTML += `
        <li class="list-group-item">
        <div class="car-buttons mb-5 d-flex justify-content-between">
            <div>
                <button id="${id}"  class="btn btn-primary btn-sm start-btn">Start</button>
                <button id="${id}" class="btn btn-primary btn-sm stop-btn">Stop</button>
                <button id="${id}" class="btn btn-primary btn-sm select-btn">Select</button>
                <button id="${id}" class="btn btn-danger btn-sm delete-btn">
                  <i class="fas fa-trash"></i>
                </button>
            </div>
            <span>${name}</span>
        </div>
        <div class="w-100  d-flex">
            <i id="car${id}" style="color:${color}" class="fa-solid fa-car-side position-absolute fa-2xl car-icon"></i>
            <div style="width: 100%; background-color: red; height: 2px; margin-top: 15px;"></div>
            <i  class="fa-solid fa-flag fa-2xl"></i>
        </div>
    </li>
        `;
  });

  

// select
  const selectBtn = document.querySelectorAll('.select-btn')
  selectBtn.forEach((btn) => {
    btn.addEventListener('click' , () => {
        selectCar(btn.getAttribute('id'))
      })
  })

  const startBtn = document.querySelectorAll(".start-btn")
  startBtn.forEach((btn, i) => {
    btn.addEventListener('click' , () => {
        startCar(btn.getAttribute('id'), carColors[i])
      })
  })

// delete
  const deleteCarEl = document.querySelectorAll('.delete-btn')
  deleteCarEl.forEach((btn) => {
    btn.addEventListener('click', () => {
      deleteCar(btn.getAttribute('id'))
    })
  })

  // stop
  const stopCarBtn = document.querySelectorAll(".stop-btn")
  stopCarBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      stopCar(btn.getAttribute('id'))
    })
  })


};








export { createCarToUI };
