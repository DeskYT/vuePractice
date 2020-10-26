import axios from "axios";

const HOST = "api.openweathermap.org";
const API_KEY = "b8d67052dc6c85fb12d75983c11d464b";

export default {
    name: 'Weather',
    data() {
        return {
            currentCityWeather: null
        }
    },
    props: {
        currentCity: null,
    },
    mounted() {
        if(!this.currentCity) return;
        console.log("CITYWEATHER:", this.currentCity);
        this.getDetailedWeatherByCoords(this.currentCity.coord)
            .then((res)=>{
                this.currentCityWeather = res;
                console.log("DETAILED WEATHER: ", res)
            })
    },
    components: {},
    methods: {
        applyCurrentPosition: function(pos){
            const currentGeoPos = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            };
            this.getCityWeatherByCoords(currentGeoPos)
                .then((res)=> {
                    this.addCity(res)
                    console.log("GetByCoords", res)
                });
        },

        errorHandler: function (e){
            console.log(e);
            alert(e.message);
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
        getDetailedWeatherByCoords: async (coord)=> {
            const {lat, lon} = coord;
            return await axios.get(`https://${HOST}/data/2.5/onecall`, {
                params: {
                    appid: API_KEY,
                    lat,
                    lon,
                    exclude: "minutely"
                }
            });
        },
    }

}