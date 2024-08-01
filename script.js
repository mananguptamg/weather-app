// // api call is a communication medium b/w source and client

// // api call is a network call as internet pe call jaegi,mera output uncertain h kab aega ,so call it asynchronously

// // function k andar api call karne k lie use fetch api

// console.log("hello");
// const API_KEY="03d02fc1c6fd25ce175a58e7b872f8b1";

// // best practice ek func api call krega and ek ui pe display  krega

// function renderWeatherInfo(data){
//         let newPara=document.createElement('p');
//         newPara.textContent=`${data?.main?.temp.toFixed(2)} °C `
//         document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails(){
//     try{
//         let city="goa";

//         // const response=fetch(api) for calling api
        
//         // fetch se kuch set aur get kiya ja skte h 

//         // error can also come while calling api or conveting into json so try catch me dalo isko
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//         const data= await response.json();  // after completion then only answer shoeuld be stored sly in abive api fetch

//         // for displaying into ui

//         renderWeatherInfo(data);

        
//         // console.log("weather data:->",data);


//     }

//     catch(err){

//     }
    
    

  
// } 

// // basis on latitude longitutde wali api pe data fetch

// // use try catch block if data not available there will be error

// async function getCustomWeatherDetails(){
//     try{
//         let latitude=17.6333;
//         let longitude=18.3333;
    
//         let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
//         let data=await response.json();
    
//         console.log(data);
    
    
//     }


//     catch(err){
//         console.log("error found",err);
//     }
// }

// // for location

// function getLocation(){

//     // check if geolocation support available

//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }

//     else{
//         console.log("No location support");
//     }
// }

// function showPosition(position){
//     let lat=position.coords.latitude;
//     let longi=position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }

// // ui total 4 displays

// // 1) grant location access

// // 2)your location wali

// // 3) loading wali screen

// // 4)search ui

// respone.JSON: it converts respone from api call into json format

// JSON.parse() : it converts json string into json object

const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather");
const userContainer=document.querySelector(".weather-container");

const grantAccessContainer=document.querySelector(".grant-location-container");

const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");

const userInfoContainer=document.querySelector(".user-info-container");

const apiErrorImg = document.querySelector("[data-notFoundImg]");
const apiErrorMessage = document.querySelector("[data-apiErrorText]");
const apiErrorBtn = document.querySelector("[data-apiErrorBtn]");
const apiErrorContainer = document.querySelector(".api-error-container");


// by defalut mera current tab userTab equal
// and its prop added in css by classList
let  currentTab=userTab;
const API_KEY= "03d02fc1c6fd25ce175a58e7b872f8b1";

// ho skta h storage me latitude aur longitude present ho

getfromSessionStorage();

// current tab ki classList me uski particular properties (css) add kardo

currentTab.classList.add("current-tab");


// jis tab pe click kiya h usse css properties hatao and vo sari properties now add in clicked tab 
function switchTab(clickedTab){

    if(clickedTab!=currentTab){
        apiErrorContainer.classList.remove("active");
        // current tab se color hatao i.e background-color

        currentTab.classList.remove("current-tab");

        currentTab=clickedTab;

        // vapis add properties of currentTab
        currentTab.classList.add("current-tab" );

        // check whether we are on search weather or your weather (if active class )

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        } 

        else{

            // mainpehle search walr tab par tha but weather val visble karna h
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");

            // ab main your weather tab me aagya hu to weathre bhi display karna padega,so let's cjheck localstorage first for coordinates,if we have saved them there
            getfromSessionStorage();

        } 
    }
}

// checkif coordinatesarealready present in session storage

function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");  // jis bhi item ko we send ,(jis nam se humne save kiya h) useko hi search kr skte ho

    if(!localCoordinates){

        // agar local coordinates nahi mile means not saved i.elocation wale ko visible karwao
        grantAccessContainer.classList.add("active");
   
    }

    // agar pde hue h to use them and latitude aur longitude ka use karke api call kro


    else{

        // main pehle search wale tab pe tha ab your weather ko visible karna h
        const coordinates=JSON.parse(localCoordinates);  // local coordiantes converted into json

        // ab latitudeaurlongitude keadhar par weather ke ke ao

        fetchUserWeatherInfo(coordinates);

    }
}

// as api call so make async function

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;

    // make grant container invisible

    grantAccessContainer.classList.remove("active");

    // make loader visible

    loadingScreen.classList.add("active");

    // api call

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data=await response.json();

        loadingScreen.classList.remove("active");

        // make weather user visible

        userInfoContainer.classList.add("active");

        // render data to dynamically add values in userWeather info

        renderWeatherInfo(data);
    }

    catch(err){
        loadingScreen.classList.remove("active");
        apiErrorContainer.classList.add("active");
        apiErrorImg.style.display = "none";
        apiErrorMessage.innerText = `Error: ${error?.message}`;
        apiErrorBtn.addEventListener("click", fetchUserWeatherInfo);
    }
}


function renderWeatherInfo(weatherInfo){

    // firstly we have to fetch the element

    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-WeatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    // fetch values from weather info object and put in UI elements

    // use optional chainging operator in json format to retrrieve data(i.e ?)

    cityName.innerText=weatherInfo?.name;

    // as image so add in src

    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

    // pure object me (i.e weather info me) weather prop me pehle element pe go to description
    //   ?. means iske andar

    desc.innerText=weatherInfo?.weather?.[0]?.description;

    weatherIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

    temp.innerText=`${weatherInfo?.main?.temp}°C `;

    windspeed.innerText=`${weatherInfo?.wind?.speed} m/s`;

    humidity.innerText=`${weatherInfo?.main?.humidity}%`;

    cloudiness.innerText=`${weatherInfo?.clouds?.all}%`;
}

// if no coordinates present

function getLocation(){

    // check if geolocation support available

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition); // showPosition is callback function
    }

    else{
        alert("No geolocation support available");
    }
}

// position has position coordinates
// A callback function that takes a GeolocationPosition object as its sole input parameter.

function showPosition(position){

    // object creation userCoordinates

    const userCoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }

    // store in local Storage(session)

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));

    // show on ui

    fetchUserWeatherInfo(userCoordinates);

}   

// search weather 

// city k adhar par api call so conert into async

async function fetchSearchWeatherInfo(city){

    loadingScreen.classList.add("active");

    // purana weather remove

    userInfoContainer.classList.remove("active");

    // grantAccessContainer.classList.remove("active");

    apiErrorContainer.classList.remove("active");

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data=await response.json();

        if (!data.sys) {
            throw data;
        }

        loadingScreen.classList.remove("active");

        // add weather diplay wala

        userInfoContainer.classList.add("active");

        // dynamically add weather

        renderWeatherInfo(data);

    }

    catch (error) {
        // console.log("Search - Api Fetch Error", error.message);
        loadingScreen.classList.remove("active");
        apiErrorContainer.classList.add("active");
        apiErrorMessage.innerText = `${error?.message}`;
        apiErrorBtn.style.display = "none";
    }
}

// add event listener

userTab.addEventListener('click',()=>{
    // passed clicked tab as input Parameter

    switchTab(userTab);
})

searchTab.addEventListener('click',()=>{
    switchTab(searchTab); // clciked on which tab pass that as an argument
})

// on grantAcessButton

const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);

// on search form

const searchInput=document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value; // get value in search box

    if(cityName===""){
        return;
    }

    else{
        fetchSearchWeatherInfo(cityName);   
        searchInput.value="";
    }
})