const specContainer = document.getElementById('specialists')
const reviewContainer = document.getElementById('review')
const thanksContainer = document.getElementById('thnx')
const stars = document.querySelectorAll('.fa-star')
const subBtn = document.getElementById('submit-btn')
let selectedSpec
let starRate = 0
let review

document.querySelectorAll('.spec-button').forEach(element => {
    element.addEventListener('click', (ev) => {
        selectedSpec = ev.target.id ? ev.target.id : ev.target.parentNode.id
        selectedSpec = selectedSpec.replace('spec-', '')
        openReview()
    })
});

stars.forEach(star => {
    star.addEventListener('click', (ev) => {
        starRate = ev.target.id.replace('star', '')
        updateStarsColor()
    })
})

subBtn.addEventListener('click', sayThanks)

function openReview() {
    specContainer.classList.toggle('hidden')
    reviewContainer.classList.toggle('hidden')
}

function sayThanks() {
    review = document.querySelector('.review-input').value

    fetch('http://localhost:3000/rating', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            specialistID: selectedSpec,
            starRate,
            review,
            date: new Date()
        })
    })

    reviewContainer.classList.toggle('hidden')
    thanksContainer.classList.toggle('hidden')
    setTimeout(init, 15000)
}

function init() {
    selectedSpec = undefined;
    starRate = 0
    document.querySelector('.review-input').value = ""
    review = undefined

    thanksContainer.classList.toggle('hidden')
    specContainer.classList.toggle('hidden')

    updateStarsColor()
}

function updateStarsColor() {
    stars.forEach((star, idx) => {
        if (idx < starRate) {
            star.style.color = 'orange'
        } else {
            star.style.color = '#BDCBB4'
        }
    })
}