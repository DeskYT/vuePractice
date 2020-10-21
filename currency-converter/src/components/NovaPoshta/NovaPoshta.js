import axios from "axios";
const HOST = "api.novaposhta.ua/v2.0/json";
const API_KEY = "9a557481f95094531372a9d1b55222c8";
export default {
    name: 'NovaPoshta',
    data() {
        return {
            areas: [],
            selectedArea: null,
            cities: [],
            searchCity: {
                isSearching: false,
                request: ""
            },
            selectedCity: null,
            warehouses: [],
            selectedWarehouse: null
        }
    },

    created: function () {
        this.getAreas();
       console.log(this.areas);
    },
    methods: {

        getAreas: function (){
            axios.post(`https://${HOST}/`, {
                apiKey: API_KEY,
                modelName: "Address",
                calledMethod: "getAreas",
                methodProperties: {}
            })
            .then(response => {
                if(response.data.success)
                    this.areas = response.data.data
                else
                    console.error(response.data.errors);
            });

        },
        getCities: function (){
            this.selectedCity = null;
            this.searchCity.request = "";
            console.log(this.selectedArea);
            axios.post(`https://${HOST}/`, {
                "apiKey": API_KEY,
                "modelName": "Address",
                "calledMethod": "getCities",
                "methodProperties": {
                    "AreaRef": this.selectedArea
                }
            })
                .then(response => {
                    console.log(response.data.data)
                    if(response.data.success)
                        this.cities = response.data.data
                    else
                        console.error(response.data.errors);
                });
        },
        getWarehouses: function (){
            this.selectedWarehouse = null;
            axios.post(`https://${HOST}/`, {
                "apiKey": API_KEY,
                "modelName": "AddressGeneral",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                    "CityRef": this.selectedCity.Ref
                }
            })
                .then(response => {
                    console.log(response.data.data)
                    if(response.data.success)
                        this.warehouses = response.data.data
                    else
                        console.error(response.data.errors);
                });
        },
        handleSearchCityFocus(e){
            e.preventDefault()
            if(e.type==="focusin")
                this.searchCity.isSearching = true;
            /*if(e.type==="focusout")
                this.searchCity.isSearching = false*/

        },
        handleCityChoosing: function (city){
            console.log(this.searchCity.isSearching)
            this.selectedCity = city
            this.searchCity.request = city.Description
            this.searchCity.isSearching = false;
            this.getWarehouses();
            console.log(this.searchCity.isSearching)
        }
    }

}