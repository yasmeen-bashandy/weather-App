let today = document.getElementById("today"),
    todayDateMonth= document.getElementById("today-date-month"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("todayDegree"),
    todayIcon = document.getElementById("todayIcon"),
    description = document.getElementById("todayDescription"),

    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),

    searchBar = document.getElementById("searchBar"),
    responseData,
    finalData,
    currentCity="Alexandria"

    // Next Days Variables:
    let nextDay = document.getElementsByClassName("nextDay"),
    nextDayIcon = document.getElementsByClassName("nextDayIcon"),
    maxDegree = document.getElementsByClassName("maxDegree"),
    minDegree = document.getElementsByClassName("minDegree"),
    nextDayDescription = document.getElementsByClassName("nextDayDescription")


monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


async function getData(){
    responseData= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=790126e6a09342cfa6a162205232802&q=${currentCity}&days=3&aqi=yes&alerts=yes`);
    finalData= await responseData.json();
    console.log(finalData);
    displayTodayWeather()
    displayNextDayWeather()
};

getData()

function displayTodayWeather(){
    let date =new Date();
    // console.log(days[date.getDay()]);
    today.innerHTML=days[date.getDay()];
    todayDateMonth.innerHTML=`${date.getDay()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML=finalData.location.name;
    todayDegree.innerHTML=finalData.current.temp_c;
    todayIcon.setAttribute("src",`https:${finalData.current.condition.icon}`);
    description.innerHTML=finalData.current.condition.text;
    // console.log(finalData.current.wind_kph);
    wind.innerHTML=finalData.current.wind_kph
    compass.innerHTML=finalData.current.wind_dir
    humidty.innerHTML=finalData.current.humidity
}

// console.log(days[new Date(2023-03-03).getDay()])
function displayNextDayWeather(){
    for(let i=0;i<nextDay.length;i++){
        nextDay[i].innerHTML= days[new Date(finalData.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute('src',`https:${finalData.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML=finalData.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML=finalData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML=finalData.forecast.forecastday[i+1].day.condition.text
    }
}
// displayNextDayWeather()

searchBar.addEventListener("keyup",function(){
   currentCity= searchBar.value;
   console.log("currentCity");
   getData()

})
