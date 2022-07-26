var opened = []
var matched = 0
var moves = 0
const modal = document.querySelector('.modal')
const amount = document.querySelector('.moves-counter span')
const btnTryAgain = document.querySelector('#try-again')

function shuffle(arrin) {
    const arr = [...arrin]
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

function init() {
    const card = document.querySelectorAll('.card')
    const field = document.querySelector('.field')
    const cardArr = [...card]

    card.forEach(item => {
        item.classList.remove('match')
    })

    for (let item of card) {
        item.addEventListener('click', (e) => {
            if (opened.length == 2 || e.detail > 1) {
                e.stopImmediatePropagation()
            }
        })

        item.addEventListener('click', (e) => {

            if (item.className.indexOf('opened') == -1 && item.className.indexOf('match') == -1) {
                item.classList.add('opened')
                opened.push(item)
                addMove()
            }

            if (opened.length == 2 && opened[0] != opened[1]) {
                setTimeout(() => {
                    document.querySelectorAll('.opened').forEach(item => item.classList.remove('opened'))
                    opened = []
                }, 1000)
            }

        })

        item.addEventListener('click', (e) => {

            if (opened.length == 2 && opened[0].getAttribute('type') === opened[1].getAttribute('type')) {
                opened[0].classList.add('match')
                opened[1].classList.add('match')
                matched += 2
                console.log(matched)
            }

            if (matched == 16) {
                showModal()
            }

        })
    }

    matched = 0
    moves = 0

    let shufCard = shuffle(cardArr)
    for (let item of shufCard) {
        field.append(item)
    }

    modal.style.display = 'none'
    amount.textContent = moves

}

function addMove() {

    moves++
    amount.textContent = moves
}

function showModal() {
    console.log('showModal')
    const steps = document.querySelector('.congratulation-message span')

    steps.textContent = moves
    modal.style.display = 'block'

}

init()

btnTryAgain.addEventListener('click', (e) => {
    e.preventDefault()
    init()
})


