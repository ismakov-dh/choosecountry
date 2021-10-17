"use strict";

// Functions
function hide(elem) {
    elem.style.display = "none";
}
function show(elem) {
    elem.style.display = "flex";
}
function onHeaderButtonClick(str) {
    if (pageStatus !== str) {
        pageStatus = str;
        navigateMenu(pageStatus);
    }
}
function navigateMenu(pageStatus) {
    switch (pageStatus) {
        case "map":
            logo.src = "images/headerLogo.png";
            show(mapTemplate);
            hide(informationTemplate);
            hide(constructorTemplate);
            hide(countryInformationTemplate);
            document.body.classList.add("overflowHidden");
            break;
        case "information": 
            logo.src = "images/headerLogo.png";
            show(informationTemplate);
            hide(mapTemplate);
            hide(constructorTemplate);
            hide(countryInformationTemplate);
            document.body.classList.remove("overflowHidden");
            break;
        case "constructor": 
            logo.src = "images/headerLogo.png";
            show(constructorTemplate);
            hide(mapTemplate);
            hide(informationTemplate);
            hide(countryInformationTemplate);
            document.body.classList.remove("overflowHidden");
            break;
        case "countryInformation":
            show(countryInformationTemplate);
            hide(mapTemplate);
            document.body.classList.remove("overflowHidden");
    }
}
function drawCharacteristicButtons(buttons, characterCount) {
    for (let i = 0; i < characterCount; i++) {
        buttons[i].classList.add("selected");
    }
}
function cleanCharacteristicButton(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
}
function activateCharacteristicButtons(buttons, characterId) {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("id", `constructorButton-${characterId}-${i+1}`);
        buttons[i].classList.add(`constructorButton-${characterId}`);
        buttons[i].addEventListener("click", onConstructorButtonClick);
    }
}
function fillCharacteristicTemplate(characteristics, characteristicTemplate, characteristicListTemplate) {
    for (let character of characteristics) {
        let cloneCharacteristicTemplate = characteristicTemplate.cloneNode(true);
        let buttons = cloneCharacteristicTemplate.querySelectorAll("button");
        
        cloneCharacteristicTemplate.querySelector(".characteristics-item__title").textContent = character.name;
        activateCharacteristicButtons(buttons, character.id);
        drawCharacteristicButtons(buttons, character.count)
        characteristicListTemplate.appendChild(cloneCharacteristicTemplate);
    }
} 
function onConstructorButtonClick(evt) {
    let [,characterId, characterCount] = evt.target.getAttribute("id").split("-");
    let character = characteristics.find(item => item.id === +characterId);
    character.count = +characterCount;
    
    let buttons = constructorTemplate.querySelectorAll(`.constructorButton-${characterId}`);
    cleanCharacteristicButton(buttons);
    drawCharacteristicButtons(buttons, characterCount);
    document.querySelector(`#personPart-${characterId}`).src = `images/characterPart/${characterId}${characterCount}.png`;
    changeCountryOnConstructorPage(characteristics.map(characteristic => characteristic.count).join(""));
}
function changeCountryOnConstructorPage(str) {
    let country = getCloseCountry(str);
    // let country = countries.find(country => country.characteristics === str);
    document.querySelector(`.person__country`).src = `images/countriesLogo/${country.id}.png`;
}
function getCloseCountry(str) {
    let arr = str.split("");
    let min = Infinity;
    let minIndex;
    let diff = [""];
    for (let i = 1; i < countries.length; i++) {
        let currentCharacteristics = countries[i].characteristics.split("");
        diff[i] = (currentCharacteristics.map((item, index) => {
            return Math.abs(+item - +arr[index]);
        }).reduce((prev, cur) => prev + cur, 0));
    };
    for (let i = 1; i < diff.length; i++) {
        if (diff[i] < min) {
            min = diff[i];
            minIndex = i;
        }
    }
    return countries[minIndex];
}
// Templates: Sections and other;
let mapTemplate = document.querySelector(".map");
let informationTemplate = document.querySelector(".information");
let constructorTemplate = document.querySelector(".constructor");
let countryInformationTemplate = document.querySelector(".countryInformation")
let characteristicTemplate = constructorTemplate.querySelector("#characteristics-item").content.querySelector(".characteristics-item");
let characteristicListTemplate = constructorTemplate.querySelector(".characteristics__list");
let countryInformationCharacteristicListTemplate = countryInformationTemplate.querySelector(".countryInformation__characteristics");

// Header Navigation Buttons
let mapButton = document.querySelector(".mapButton");
let informationButton = document.querySelector(".informationButton");
let constructorButton = document.querySelector(".constructorButton");

// Other variables
let pageStatus = "map";
let logo = document.querySelector(".header__logo");
let countryInformationPerson = document.querySelector(".countryInformation__person");
let countryInformationPhoto = document.querySelector(".countryInformation__photo");
let isFullCharacteristicTemplate = false;
let characteristics = [
    { id: 1, name: "Жилищные условия", count: 1, },
    { id: 2, name: "Доход", count: 1, },
    { id: 3, name: "Работа", count: 1, },
    { id: 4, name: "Общество", count: 1, },
    { id: 5, name: "Образование", count: 1, },
    { id: 6, name: "Экология", count: 1, },
    { id: 7, name: "Гражданские права", count: 1, },
    { id: 8, name: "Здоровье", count: 1, },
    { id: 9, name: "Удовлетворённость", count: 1, },
    { id: 10, name: "Безопасность", count: 1, },
    { id: 11, name: "Работа / отдых", count: 1, },
];
let countries = [
    {id: 0, name: "choosecountry", characteristics: "11111111111",},
    {id: 1, name: "australia", characteristics: "32333333322",},
    {id: 2, name: "austria", characteristics: "22322223332",},
    {id: 3, name: "belgium", characteristics: "32223233333",},
    {id: 4, name: "brazil", characteristics: "21221222212",},
    {id: 5, name: "canada", characteristics: "32333323332",},
    {id: 6, name: "chile", characteristics: "21211112222",},
    {id: 7, name: "czechrepublic", characteristics: "21222212232",},
    {id: 8, name: "denmark", characteristics: "21333322332",},
    {id: 9, name: "estonia", characteristics: "21223222122",},
    {id: 10, name: "finland", characteristics: "21233323332",},
    {id: 11, name: "france", characteristics: "22222223233",},
    {id: 12, name: "germany", characteristics: "22323223333",},
    {id: 13, name: "greece", characteristics: "21112112122",},
    {id: 14, name: "hungary", characteristics: "21222212122",},
    {id: 15, name: "iceland", characteristics: "22332323332",},
    {id: 16, name: "ireland", characteristics: "21232213232",},
    {id: 17, name: "israel", characteristics: "21222123321",},
    {id: 18, name: "italy", characteristics: "21222123123",},
    {id: 19, name: "japan", characteristics: "22323212132",},
    {id: 20, name: "korea", characteristics: "21212121121",},
    {id: 21, name: "latvia", characteristics: "11212211122",},
    {id: 22, name: "lithuania", characteristics: "21212211123",},
    {id: 23, name: "luxembourg", characteristics: "23322223232",},
    {id: 24, name: "mexico", characteristics: "11211122211",},
    {id: 25, name: "netherlands", characteristics: "21323333333",},
    {id: 26, name: "newzealand", characteristics: "21232323322",},
    {id: 27, name: "norway", characteristics: "32332323333",},
    {id: 28, name: "poland", characteristics: "21212112122",},
    {id: 29, name: "portugal", characteristics: "21211212132",},
    {id: 30, name: "russia", characteristics: "21222111123",},
    {id: 31, name: "slovakrepublic", characteristics: "21222222222",},
    {id: 32, name: "slovenia", characteristics: "21223212132",},
    {id: 33, name: "southafrica", characteristics: "11121121112",},
    {id: 34, name: "spain", characteristics: "21232213233",},
    {id: 35, name: "sweden", characteristics: "22323323333",},
    {id: 36, name: "switzerland", characteristics: "23333313333",},
    {id: 37, name: "turkey", characteristics: "21211122121",},
    {id: 38, name: "uk", characteristics: "22332223232",},
    {id: 39, name: "usa", characteristics: "33322223222",},
]

// Start!
document.addEventListener("click", function(evt) {
    switch (evt.target) {
        case mapButton:
            onHeaderButtonClick("map");
            break;
        case constructorButton:
            onHeaderButtonClick("constructor");
            break;
        case informationButton:
            onHeaderButtonClick("information");
            break;
    }
});
window.addEventListener("load", function() {
    navigateMenu(pageStatus);
    fillCharacteristicTemplate(characteristics, characteristicTemplate, characteristicListTemplate);
});


(function() {    
    let map = document.querySelector(".map__wrapper");
    let instance = panzoom(map, {
        maxZoom: 4.5,
        minZoom: 1,
        bounds: true,
        boundsPadding: 0.4,
    });
    instance.on('transform', function(evt) {
        mapPerson.style.display = "none";
    })
    setTimeout(() => {
        instance.smoothZoom(window.innerWidth / 2, 110, 4.5);
        setTimeout(() => {
            instance.setMinZoom(4.5);
        }, 500)
        
    }, 1000);
    
    let mapPerson = document.querySelector(".map__person");
    const MAP_PERSON_WIDTH = 400;
    const MAP_PERSON_HEIGHT = 600;


    function onCountryHover(evt) {
        let country = evt.target;
        let countryPos = country.getBoundingClientRect();
        let countryId = country.getAttribute("id").split("-")[1];
        let countryCharacteristics = countries.find(country => country.id == countryId).characteristics.split("");
        mapPerson.style.display = "block";
        for (let i = 1; i < 11; i++) {
            mapPerson.querySelector(`#mapPersonPart-${i}`).src = `images/characterPart/${i}${countryCharacteristics[i - 1]}.png`;
        }
        mapPerson.src = `images/characters/${countryId}.png`;
        logo.src = `images/countriesLogo/${countryId}.png`
        if (countryId == "30") {
            mapPerson.style.top =  `${Math.round(countryPos.top) + Math.round(countryPos.height) / 2 - MAP_PERSON_HEIGHT / 2}px`;
            mapPerson.style.left = `${Math.round(countryPos.left) + Math.round(countryPos.width) / 20 - MAP_PERSON_WIDTH / 2}px`;    
        }
        else {
            mapPerson.style.top = `${Math.round(countryPos.top) + Math.round(countryPos.height) / 2 - MAP_PERSON_HEIGHT / 2}px`;
            mapPerson.style.left = `${Math.round(countryPos.left) + Math.round(countryPos.width) / 2 - MAP_PERSON_WIDTH / 2}px`;
        }
    }
    function onCountryMouseLeave(evt) {
        mapPerson.style.display = "none";
        if (pageStatus === "map") logo.src = "images/countriesLogo/0.png";
    }
    function onCountryClick(evt) {
        countryInformationPerson.style.display = "none";
        let countryId = evt.target.getAttribute("id").split("-")[1];
        let countryCharacteristics = countries.find(country => country.id == countryId).characteristics.split("");
        let characteristicTemplates = countryInformationCharacteristicListTemplate.querySelectorAll(".countryInformationCharacteristics-item");
        logo.src = `images/countriesLogo/${countryId}.png`;
        for (let i = 0; i < characteristics.length; i++) {
            let buttons = characteristicTemplates[i].querySelectorAll("button");
            characteristicTemplates[i].querySelector(".countryInformationCharacteristics__title").textContent = characteristics[i]["name"];
            cleanCharacteristicButton(buttons);
            drawCharacteristicButtons(buttons, +countryCharacteristics[i])
        }
        countryInformationPhoto.src = `images/countries/${countryId}.png`;
        for (let i = 1; i < 11; i++) {
            countryInformationPerson.querySelector(`#countryInformationPersonPart-${i}`).src = `images/characterPart/${i}${countryCharacteristics[i - 1]}.png`;
        }
        
        setTimeout(() => {
            let cpp = countryInformationPhoto.getBoundingClientRect();
            countryInformationPerson.style.top = `${Math.round(cpp.top) + Math.round(cpp.height) / 2 - MAP_PERSON_HEIGHT / 2}px`;
            countryInformationPerson.style.left = `${Math.round(cpp.left) + Math.round(cpp.width) / 2 - MAP_PERSON_WIDTH / 2}px`;
            countryInformationPerson.style.display = "block";
        }, 200)
        
        pageStatus = "countryInformation";
        navigateMenu(pageStatus);
        
    }
    let pathCountries = map.querySelectorAll(".country");
    pathCountries.forEach(country => {
        country.addEventListener("click", onCountryClick);
        country.addEventListener("mouseenter", onCountryHover);
        country.addEventListener("mouseleave", onCountryMouseLeave);
    })
})()