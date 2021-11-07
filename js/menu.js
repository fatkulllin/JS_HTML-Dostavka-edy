const renderItems = data=>{
    console.log(data)
}

fetch('https://test-dostavka-edy-default-rtdb.firebaseio.com/db/tanuki.json')
.then(response=>response.json())
.then(data=>{
    renderItems(data)
})
// метод обрабатывает ошибку. Если произойдет ошибка. то мы можем чтото тут сделать
.catch((error)=>{ 
    console.log(error)
})