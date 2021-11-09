const cart = () => {
    const buttonCart = document.getElementById('cart-button')
    const modalCart = document.querySelector('.modal-cart')
    const close = modalCart.querySelector('.close')
    const body = modalCart.querySelector('.modal-body')
    const buttonSend = modalCart.querySelector('.button-primary')
    const clearCart = modalCart.querySelector('.clear-cart')
    const cartSum = modalCart.querySelector('.modal-pricetag')

    const resetCart = () => {
        body.innerHTML = ''
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')
        cartSum.textContent = 0
        
    }


    const incrementcount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map(item => {
            if (item.id === id) {
                item.count++
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

    const dicrementcount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map(item => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }


    const renderItems = (data) => {
        body.innerHTML = ''

        data.forEach(({ name, price, id, count }) => {

            const cartElem = document.createElement('div')
            cartElem.classList.add('food-row')

            cartElem.innerHTML = `
            <span class="food-name">${name}</span>
            <strong class="food-price">${price} ₽</strong>
            <div class="food-counter">
                <button class="counter-button btn-dec" data-index="${id}">-</button>
                <span class="counter">${count}</span>
                <button class="counter-button btn-inc" data-index="${id}">+</button>
			</div>
        `
            body.append(cartElem)
        });
    }

    body.addEventListener('click', (event) => {
        event.preventDefault()

        if (event.target.classList.contains('btn-inc')) {
            incrementcount(event.target.dataset.index)
        } else if (event.target.classList.contains('btn-dec')) {
            dicrementcount(event.target.dataset.index)
        }
    })

    buttonSend.addEventListener('click', () => {
        console.log('a')
        const cartArray = localStorage.getItem('cart')
        /*Отправка данных на сервер */
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
            .then(response => {
                if (response.ok) {
                    resetCart()
                }
            })
            .catch(event => {
                console.error(e);
            })
    })

    clearCart.addEventListener('click', () => {
        resetCart()

    })

    buttonCart.addEventListener('click', () => {

        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')))
            let result = JSON.parse(localStorage.getItem('cart')).reduce((sum, element) => {
                return sum + element.price
            }, 0);
            cartSum.textContent = result
        }
        modalCart.classList.add('is-open')
    })



    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })
}





cart();