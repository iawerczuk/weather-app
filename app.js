let weather={
    "apiKey":"8ce0272205ee2c09bf7979b83c704f24",
    fetchWeather: function(location) {
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&units=metric&appid=" +
        this.apiKey
        ) 
        .then((response)=> {
            if (!response.ok) {

                alert ("Location not found");
                throw new Error ("Location not found");
            }
            return response.json()

        })
        .then((data) => this.displayWeather(data));
    },
displayWeather: function(data) {
    const { name }=data;
    const { icon, description }=data.weather[0];
    const { temp }=data.main;
    const { speed }= data.wind; 

    document.querySelector(".location").innerText="Weather in: " + name;
    document.querySelector(".img").src= "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText=description;
    document.querySelector(".temperature").innerText="Temperature " + temp + "°C";
    document.querySelector(".speed").innerText="Wind " + speed + "km/h";
    document.querySelector(".weather").classList.remove(".card");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
},
search:function () {
    this.fetchWeather(document.querySelector(".search-input").value);
}
};

document.querySelector(".search button").addEventListener("click", function(){weather.search()});
document.querySelector(".search-input").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Warsaw");
