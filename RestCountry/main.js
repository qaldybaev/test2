const container = document.querySelector(".container");
const button = document.querySelector(".darkLight");
const icon = button.querySelector("i")
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const span = document.querySelector("span")

async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        alert("Xatolik yuz berdi:", error);
    }
}
function displayCountries(countries) {
    container.innerHTML = "";
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} bayrogi rasmi">
            <h3>${country.name.common}</h3>
            <p><strong>Population:</strong> ${country.population.toLocaleString()} people</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
        `;
        card.addEventListener("click", () => showDetails(country));
        container.appendChild(card);
    });
}
function showDetails(country) {
    if (document.querySelector(".modal")) {
        document.querySelector(".modal").remove(); 
    }

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn">&larr; Back</button>
            <div class="modal-body">
                <div class="modal-left">
                    <img src="${country.flags.svg}" alt="${country.name.common}">
                </div>
                <div class="modal-right">
                    <h2>${country.name.common}</h2>
                    <p><strong>Native Name:</strong> ${country.name.official || "malumot topilmadi"}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Sub Region:</strong> ${country.subregion || "malumot topilmadi"}</p>
                    <p><strong>Capital:</strong> ${country.capital?.[0] || "malumot topilmadi"}</p>
                    
                    <p><strong>Top Level Domain:</strong> ${country.tld?.[0] || "N/A"}</p>
                    <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : "malumot topilmadi"}</p>
                    <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "malumot topilmadi"}</p>

                    <h3>Border Countries:</h3>
                    <div class="borders">
                        ${country.borders ? country.borders.map(border => `<span class="border">${border}</span>`).join(" ") : "None"}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.querySelector(".close-btn").onclick = () => modal.remove();
}


searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    const countryCards = document.querySelectorAll(".card");
    countryCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(searchText) ? "block" : "none";
    });
});

regionFilter.addEventListener("change", (e) => {
    const region = e.target.value;
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => response.json())
        .then(data => displayCountries(data))
        .catch(error => console.alert("Xatolik:", error));
});

fetchCountries();



button.addEventListener("click" ,(e) => {
const currentColor = getComputedStyle(document.documentElement).getPropertyValue("--body-color");

  if (currentColor === "#fff") {
    document.documentElement.style.setProperty("--body-color","rgb(39, 50, 62)");
    document.documentElement.style.setProperty("--text-color", "#fff");
    document.documentElement.style.setProperty("--list-color","rgb(50, 63, 76)");
    icon.classList.replace("bx-moon", "bx-sun");
    span.textContent = "Light Mode"
  } else {
    document.documentElement.style.setProperty("--body-color", "#fff");
    document.documentElement.style.setProperty("--text-color", "#000");
    document.documentElement.style.setProperty("--list-color", "#fff");
    icon.classList.replace("bx-sun", "bx-moon");
    span.textContent = "Dark Mode"
  };
})