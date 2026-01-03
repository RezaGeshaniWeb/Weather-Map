const map = L.map("map").setView([35.70015230480259, 51.33811941768732], 4.5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// search box
const geocoder = L.Control.geocoder({
  defaultMarkGeocode: false
}).on('markgeocode', e => {
  console.log(e);
  let bbox = e.geocode.bbox
  let poly = L.polygon([
    bbox.getSouthEast(),
    bbox.getNorthEast(),
    bbox.getNorthWest(),
    bbox.getSouthWest(),
  ]).addTo(map)
  map.fitBounds(poly.getBounds())
  L.marker(e.geocode.center).addTo(map).bindPopup(e.geocode.name).openPopup()
})
  .addTo(map)

// cities
const iranCities = [
  {
    name: "Tehran",
    latitude: 35.6892,
    longitude: 51.3890,
    weather: "sunny",
  },
  {
    name: "Mashhad",
    latitude: 36.2605,
    longitude: 59.6168,
    weather: "cloudy",
  },
  {
    name: "Isfahan",
    latitude: 32.6525,
    longitude: 51.6746,
    weather: "sunny",
  },
  {
    name: "Shiraz",
    latitude: 29.5918,
    longitude: 52.5837,
    weather: "windy",
  },
  {
    name: "Tabriz",
    latitude: 38.0668,
    longitude: 46.3015,
    weather: "rainy",
  },
  {
    name: "Ahvaz",
    latitude: 31.3183,
    longitude: 48.6706,
    weather: "hot",
  },
  {
    name: "Kerman",
    latitude: 30.2839,
    longitude: 57.0834,
    weather: "sunny",
  },
  {
    name: "Rasht",
    latitude: 37.2808,
    longitude: 49.5832,
    weather: "rainy",
  },
  {
    name: "Urmia",
    latitude: 37.5524,
    longitude: 45.0760,
    weather: "cloudy",
  },
  {
    name: "Yazd",
    latitude: 31.8974,
    longitude: 54.3569,
    weather: "sunny",
  }
];

// icons
const sunnyIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="#FFD43B" xmlns="http://www.w3.org/2000/svg">
             <circle cx="12" cy="12" r="5"/>
             <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
           </svg>`

const cloudyIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="#B0BEC5" xmlns="http://www.w3.org/2000/svg">
             <circle cx="9" cy="12" r="4"/>
             <circle cx="15" cy="12" r="5"/>
           </svg>`

const windyIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#29B6F6" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
             <path d="M3 12h12a4 4 0 0 1 0 8"/>
             <path d="M3 6h9a3 3 0 0 1 0 6"/>
           </svg>`

const rainyIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196F3" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
             <path d="M16 13v4M8 13v4M12 15v4"/>
             <circle cx="12" cy="8" r="4" fill="#90CAF9"/>
           </svg>`

const hotIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="#FF5722" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 2a7 7 0 0 1 0 14h-1v6a1 1 0 0 1-2 0v-6a7 7 0 0 1 3-14z"/>
           </svg>`

const weatherIcons = {
  sunny: L.divIcon({
    html: sunnyIcon,
    className: "",
    iconSize: [45, 45]
  }),
  rainy: L.divIcon({
    html: rainyIcon,
    className: "",
    iconSize: [45, 45]
  }),
  cloudy: L.divIcon({
    html: cloudyIcon,
    className: "",
    iconSize: [45, 45]
  }),
  windy: L.divIcon({
    html: windyIcon,
    className: "",
    iconSize: [45, 45]
  }),
  hot: L.divIcon({
    html: hotIcon,
    className: "",
    iconSize: [45, 45]
  }),
};

const weatherTranslation = {
  rainy: { en: 'Rainy', fa: 'بارانی' },
  sunny: { en: 'Sunny', fa: 'صاف' },
  cloudy: { en: 'Cloudy', fa: 'ابری' },
  windy: { en: 'Windy', fa: 'بادی' },
  hot: { en: 'Hot', fa: 'گرم' },
}

const cityTranslation = {
  Tehran: 'تهران',
  Mashhad: 'مشهد',
  Isfahan: 'اصفهان',
  Shiraz: 'شیراز',
  Tabriz: 'تبریز',
  Ahvaz: 'اهواز',
  Kerman: 'کرمان',
  Rasht: 'رشت',
  Urmia: 'ارومیه',
  Yazd: 'یزد',
}

const sideBar = document.querySelector('aside')
let markersTarget = {}
sideBar.innerHTML = ''

iranCities.forEach(city => {
  let weatherIcon = weatherIcons[city.weather]
  let weatherTranslated = weatherTranslation[city.weather]
  let cityTranslated = cityTranslation[city.name]

  let { html: iconHtml } = weatherIcon.options

  markersTarget[city.name] = L.marker([city.latitude, city.longitude], { icon: weatherIcon })
    .bindPopup(`${city.name} (${cityTranslated})<br>Weather Status (وضعیت آب و هوا): ${weatherTranslated.en} (${weatherTranslated.fa})`)
    .addTo(map)

  let cityBox = document.createElement('div')
  cityBox.innerHTML = `
    <div>${iconHtml || ''}</div>
    <div>
      <h5>City Name <span class="fa-text">(نام شهر)</span></h5>
      <p>${city.name} <span class="fa-text">(${cityTranslated})</span></p>
      <div>
        <span>Weather Status <span class="fa-text">(وضعیت آب و هوا)</span>: </span>
        <span>${weatherTranslated.en} <span class="fa-text">(${weatherTranslated.fa})</span></span>
      </div>
    </div>
  `

  cityBox.addEventListener('click', () => {
    map.setView([city.latitude, city.longitude])
    markersTarget[city.name].openPopup()
  })

  sideBar.appendChild(cityBox)
})