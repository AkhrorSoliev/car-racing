
const fetchData = async (method="GET", url, data , id = null) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
          },
        body: data ? JSON.stringify(data) : null
    })


    if (response.status == 500) {
        throw new Error(id)
    }
    const jsonData = response.json()
    return jsonData
}


export { fetchData }