
const menuButton = document.querySelector('.menu__btn')
const nav = document.querySelector('.nav__list')

const searchInput = document.querySelector('.search__input')
const searchBtn = document.querySelector('.search__btn')
const clearBtn = document.querySelector('.clear__btn')
const resultsTitle = document.querySelector('.response__title')
const resultsContainer = document.querySelector('.response__container')


menuButton.addEventListener('click', () => {
  nav.classList.toggle('active')
})

searchBtn.addEventListener('click', (eve) => {
  eve.preventDefault()
  searchLocation()
})


async function searchLocation() {
  const inputData = searchInput.value.toLowerCase().trim()
  let results = []
  const data = await getData()

  const match = data.countries.find(place => place.name.toLowerCase() === inputData)
  console.log(match)
  if (match) {
    results = match.cities
  } else if (data[inputData]) {
    results = data[inputData]
  }
  else {
    resultsTitle.innerText = 'Location not founded. Please try again'
  }
  renderResults(results)
}

async function getData() {
  try {
    const response = await fetch('assets/data/travel_recommendation_api.json')
    const data = await response.json()
    return data

  } catch (error) {
    console.error(error)
  }
}

function renderResults(results){
  resultsTitle.innerText = `Results for = '${searchInput.value}'`
}