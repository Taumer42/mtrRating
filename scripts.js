const specContainer = document.getElementById('specialists')
const reviewContainer = document.getElementById('review')
const thanksContainer = document.getElementById('thnx')
const stars = document.querySelectorAll('.fa-star')
const subBtn = document.getElementById('submit-btn')
let selectedSpec;
let starRate = 0

document.querySelectorAll('.spec-button').forEach(element => {
    element.addEventListener('click', (ev) => {
        selectedSpec = ev.target.id ? ev.target.id : ev.target.parentNode.id
        selectedSpec = selectedSpec.replace('spec-', '')
        openReview()
        console.log(selectedSpec)
    })
});

stars.forEach(star => {
    star.addEventListener('click', (ev) => {
        starRate = ev.target.id.replace('star', '')
        updateStarsColor()
        console.log({
            specialistID: selectedSpec,
            starRate
        })
    })
})

subBtn.addEventListener('click', sayThanks)

function openReview() {
    specContainer.classList.toggle('hidden')
    reviewContainer.classList.toggle('hidden')
}

function sayThanks() {
  fetch('http://localhost:3000/rating', {method: 'POST', body: JSON.stringify({
    specialistID: selectedSpec,
    starRate
})})
    reviewContainer.classList.toggle('hidden')
    thanksContainer.classList.toggle('hidden')
    setTimeout(init, 1000)
}

function init() {
    selectedSpec = undefined;
    starRate = 0
    thanksContainer.classList.toggle('hidden')
    specContainer.classList.toggle('hidden')
    updateStarsColor()
    console.log({
        specialistID: selectedSpec,
        starRate
    })
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