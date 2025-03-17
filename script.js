const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
// const themeChanger=document.querySelector('.theme-changer')

const themeToggleBtn = document.querySelector('.theme-toggle')


let allCountriesData

fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })

filterByRegion.addEventListener('change', (e) => {

  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)


})

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = ` 
         <img src="${country.flags.svg}" alt="${country.name.common}flag">
        <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital?.[0]}</p>
        </div>
        `

    countriesContainer.append(countryCard)
  });

}

searchInput.addEventListener('input', (e) => {
  const filterCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filterCountries)
})

// themeChanger.addEventListener('click', () => {
//   document.body.classList.toggle('dark')
// })



// darkmode code

function toggleTheme() {                                 //function to toggle dark mode         
  document.body.classList.toggle('dark')

  const isDarkMode = document.body.classList.contains('dark')
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled')

  themeToggleBtn.innerHTML = isDarkMode ? '<i class="fa-solid fa-sun"></i>Light Mode' : '<i class="fa-solid fa-moon"></i>Dark Mode';
}

// Load the theme from localStorage
if(localStorage.getItem('darkMode')==='enabled'){
  document.body.classList.add('dark')
  themeToggleBtn.innerHTML='<i class="fa-solid fa-sun"></i>Light Mode';
}

themeToggleBtn.addEventListener('click',toggleTheme)


