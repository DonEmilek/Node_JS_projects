window.onload = function(){
    const table = document.querySelector("#table")
    fetch("http://localhost:3030/data")
    .then(response => response.json())
    .then(data => data.forEach(element => {
        const nameCost = `<tr>`+`<td>`+element.name+`</td>`+`<td>`+element.cost+`</td>`+`</tr>` 
        table.insertAdjacentHTML("beforeend", nameCost)
    }))
    .catch(err => console.log(err))
}