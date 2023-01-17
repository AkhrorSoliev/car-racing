const raceBtn = document.querySelector("#race-btn");

import { fetchData } from "./reqest";
import { stopCar } from "./carfunctions";
import { render } from "./render";

const colors = []

raceBtn.addEventListener("click", () => {
  fetchData("GET", "http://127.0.0.1:3000/garage", null).then((data) => {
    getIds(data);
  });
});

import { driveCar } from "./carfunctions";

function getIds(data) {
  const allPromises = [];
  const allIds = [];
  
  data.forEach((item) => {
    colors.push(item.color)
    const promises = fetchData(
      "PATCH",
      `http://127.0.0.1:3000/engine?id=${item.id}&status=started`,
      null
    );
    allPromises.push(promises);
    allIds.push(item.id);
  });

  Promise.all(allPromises).then((data) => {
    data.forEach((item, i) => {
      driveCar(item, allIds[i], colors[i]);
    });

    statusDrive();
  });

  function statusDrive() {
    data.forEach((item, i) => {
      const promises = fetchData(
        "PATCH",
        `http://127.0.0.1:3000/engine?id=${item.id}&status=drive`,
        null,
        item.id
      ).catch((err) => {
        stopCar(err.message, true, colors[i])
      });
      allPromises.push(promises);
      allIds.push(item.id);
    });

    Promise.race(allPromises).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
  }
}



const resetBtn = document.getElementById("reset-btn")

resetBtn.addEventListener('click', () => {
  // fetchData("GET", "http://127.0.0.1:3000/garage", null).then((data) => {
  //   resetCarsFunc(data);
  // });
  render()
})

function resetCarsFunc (data)  {
  const allPromises = [];
  const allIds = [];
  data.forEach((item) => {
    const promises = fetchData(
      "PATCH",
      `http://127.0.0.1:3000/engine?id=${item.id}&status=stopped`,
      null
    )
    allPromises.push(promises);
    allIds.push(item.id);

    Promise.all(allPromises).then((data) => {
      data.forEach((item, i) => {
        driveCar(item, allIds[i]);
      });
    })
  });
}
