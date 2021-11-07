let cards = document.querySelector('.cards-restaurants');

const renderItems = data => {
    data.forEach((item) => {
        const { image, kitchen, name, price, products, stars, time_of_delivery } = item
        // console.log(products)
        const a = document.createElement('a')
        a.setAttribute('href', '/restaurant.html')
        a.classList.add('card')
        a.classList.add('card-restaurant')
        a.dataset.products = products


        a.innerHTML = `
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">${name}</h3>
                <span class="card-tag tag">${time_of_delivery} мин</span>
            </div>
            <div class="card-info">
                <div class="rating">
                    ${stars}
                </div>
                <div class="price">От ${price} ₽</div>
                <div class="category">${kitchen}</div>
            </div>
        </div>
        `

        a.addEventListener('click', (event) => {
            event.preventDefault()
            if (localStorage.getItem('user')) {
                /*динамическая реализация переохода в рестораны */
                //записываем его в localstorage
                localStorage.setItem('restaurant', JSON.stringify(item))
                //реализация перехода
                window.location.href = './restaurant.html'
            } else {
                modalAuth.style.display = 'flex'
            }
        })

        // }else{
        //     window.location.href = '/'
        // }
        cards.append(a)
    });
}

fetch('https://test-dostavka-edy-default-rtdb.firebaseio.com/db/partners.json')
    .then(response => response.json())
    .then(data => {
        renderItems(data)
    })
    // метод обрабатывает ошибку. Если произойдет ошибка. то мы можем чтото тут сделать
    .catch((error) => {
        console.log(error)
    })