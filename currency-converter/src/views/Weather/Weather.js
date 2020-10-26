import axios from "axios";
import CityWeather from "@/views/Weather/CityWeather/CityWeather.vue";

const HOST = "api.openweathermap.org";
const API_KEY = "b8d67052dc6c85fb12d75983c11d464b";

/*class City{
    constructor(obj) {
        this.name = obj.name;
        this.coord = obj.coord;
        this.fetching = true
        this.weather = null;
        this.getCityWeather()
    }
    getCityWeather = () => {
    const {lat, lon} = this.coord;
        axios.get(`https://${HOST}/data/2.5/weather`, {
            params: {
                appid: API_KEY,
                lat,
                lon,
            }
        }).then(res=>{
            this.weather = res
            this.fetching = false
        });
    }
}*/

class Cities{
    constructor(cities = JSON.parse(localStorage.getItem('weatherCities'))) {
        this.list = cities ? cities: [];
    }
    _validate(city){
        return !(!Object.prototype.hasOwnProperty.call(city, "name")
            || !Object.prototype.hasOwnProperty.call(city, "coord")
            || !Object.prototype.hasOwnProperty.call(city.coord, "lat")
            || !Object.prototype.hasOwnProperty.call(city.coord, "lon"));
    }
    push(city){
        if(!this._validate(city)) return false;
        this.list.push(city);
        let localStorList = [];
        this.list.forEach(it=>localStorList.push(
            {name: it.name,
            coord: it.coord
        }
        ));
            localStorage.setItem('weatherCities', JSON.stringify(localStorList))
        return true;
    }
    includes(city){
        if(!this._validate(city)) return false;
        for (let localCity of this.list){
            if(localCity.name === city.name
                && localCity.coord.lat === city.coord.lat
                && localCity.coord.lon === city.coord.lon)
                return true;
        }
        return false;
    }
    *[Symbol.iterator]() {
        for (let city of this.list) {
                yield city;
        }
    }
    getCityWeather = async (city) => {
        const {lat, lon} = city.coord;
        return await axios.get(`https://${HOST}/data/2.5/weather`, {
            params: {
                appid: API_KEY,
                lat,
                lon,
            }
        });
    }
}

export default {
    name: 'Weather',
    data() {
        return {
            addingCity: "",
            addedCities: new Cities(),
            currentCity: null,
            addedCitiesWeather: [],
            error: null,
        }
    },
    mounted() {
        if(!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        } else {
            //status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(this.applyCurrentPosition, this.errorHandler);
        }
        for (let it of this.addedCities){
            this.getCityWeatherByCoords(it.coord).then(res=>{
                it.weather = res.data
                console.log(it)
            });
        }
    },
    components: {
        CityWeather
    },
    methods: {
        applyCurrentPosition: function(pos){
            const currentGeoPos = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            };
            this.getCityWeatherByCoords(currentGeoPos)
                .then((res)=> {
                    this.addCity(res)
                    console.log("GetByCoords", res)
                });
        },

        errorHandler: function (e){
            this.error = e.message;
            console.error(e);
            //alert(this.error);
        },

        addCityHandler: function() {
            if(this.addingCity==="") return;
            this.getCityWeather(this.addingCity)
                .then(res=>this.addCity(res))
                .catch(()=>alert("Город не найден"))
            this.addingCity = "";
        },

        addCity: function(city) {
            if (!this.checkCity(city)){
                this.error = "Город не найден"
                return;
            }
            console.log(city);
            const {name, coord} = city.data;
            const newCity = {
                name,
                coord
            };
            this.currentCity = newCity //TESTING
            console.log(this.currentCity)
            if (!this.addedCities.includes(newCity))
            {
                this.getCityWeatherByCoords(newCity.coord).then(res=>{
                    newCity.weather = res.data
                    this.addedCities.push(newCity);
                });
            }
        },

        checkCity: (data) => !(Object.prototype.hasOwnProperty.call(data, "cod")),

        getCityWeather: async (city)=> {
            return await axios.get(`https://${HOST}/data/2.5/weather`, {
                params: {
                    "appid": API_KEY,
                    "q": city,
                }
            });
        },
        getCityWeatherByCoords: async (coord)=> {
            const {lat, lon} = coord;
            return await axios.get(`https://${HOST}/data/2.5/weather`, {
                params: {
                    appid: API_KEY,
                    lat,
                    lon,
                }
            });
        },
        roundTemp: function(value) {
            return value.toFixed(1);
        }
        /*getDetailedWeatherByCoords: async (coord)=> {
            const {lat, lon} = coord;
            return await axios.get(`https://${HOST}/data/2.5/onecall`, {
                params: {
                    appid: API_KEY,
                    lat,
                    lon,
                    exclude: "minutely"
                }
            });
        },*/
    }

}