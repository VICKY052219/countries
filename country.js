const countryName = new URLSearchParams(location.search).get('name')
const flagImg = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name ')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries=document.querySelector('.border-countries')
const themeToggleBtn = document.querySelector('.theme-toggle')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImg.src = country.flags.svg
    countryNameH1.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region


    topLevelDomain.innerText = country.tld.join(', ')

    if (country.capital) {
      capital.innerText = country.capital?.[0]

    }

    if (country.subRegion) {
      subRegion.innerText = country.subregion

    }
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }
    else {
      nativeName.innerText = country.name.common
    }
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
      .map((currencies) => currencies.name)
      .join(', ')
    }
    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(', ')
    }

     console.log(country)
    if (country.borders) {
      country.borders.forEach((border) => {
      
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
         //   console.log(borderCountry)
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href=`country.html?name=${borderCountry.name.common}`
            
            //console.log(borderCountryTab)
            borderCountries.append(borderCountryTag)
          })
      })

    }
  })


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
  