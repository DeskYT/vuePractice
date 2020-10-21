<template>
  <div class="novaposhtaContainer">
    <h2>Nova Poshta API</h2>
    <div class="areaSelector">
      <select v-model="selectedArea" v-on:change="getCities">
        <option v-for="area in areas" v-bind:key="area.Ref" v-bind:value="area.Ref">{{area.Description}}</option>
      </select>
    </div>
    <div class="citiesListContainer">
      <input type="text" :disabled="this.selectedArea === null ? '' : disabled" v-model="searchCity.request" v-on:focusin="handleSearchCityFocus" placeholder="Выберите город">
      <ul class="citiesList" v-if="searchCity.isSearching===true">
        <li class="cityContainer" v-for = "(city, index) in cities"
             v-bind:key="city.Ref"
             :class = "city.Description.toLowerCase().includes(searchCity.request.toLowerCase())
           || city.DescriptionRu.toLowerCase().includes(searchCity.request.toLowerCase()) ? '' : 'exclude'" v-on:click="handleCityChoosing(city)">
          {{city.Description}} {{index}}
        </li>
      </ul>
    </div>
    <div class="areaSelector">
      <select :disabled="this.selectedCity === null ? '' : disabled" v-model="selectedWarehouse">
        <option v-for="warehouse in warehouses" v-bind:key="warehouse.Ref" v-bind:value="warehouse.Ref">{{warehouse.Description}}</option>
      </select>
    </div>


  </div>
</template>
<script defer src="@/components/NovaPoshta/NovaPoshta.js"></script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
.novaposhtaContainer *{
  font-size: 1rem;
}
.areaSelector{
  width: 240px;
  height: 40px;
  overflow: hidden;
  background-size: 10%;
  border: 2px solid #6b6b6b;
  position: relative;
  margin-bottom: 10px;
}
.areaSelector > select{
  background: transparent;
  width: 100%;
  line-height: 1;
  border: 0;
  border-radius: 0;
  height: 34px;
  -webkit-appearance: none;
  outline: none;
  padding: 0 10px;
}
.areaSelector> select > option{
  text-align: center;
}
.areaSelector > select::after{
  color: black;
  font-size: 20px;
  content: "ˬ";
}
.citiesListContainer{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
}
.citiesListContainer > input{
  padding: 10px;
  height: 40px;

  width: 100%;
}
.citiesList{
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  z-index: 1;
  max-height: 250px;
  overflow-y: scroll;
  background-color: #efefef;
}
.cityContainer{
  cursor: pointer;
  user-select: none;
}
.cityContainer:hover{
  background-color: cornflowerblue;
}
.novaposhtaContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
table { margin-top: 15px}
th, td { padding: 5px 10px; text-align: center}
.btn {
  font-size: 16px;
  padding: 6px 10px;
  border: 0;
  border-radius: 15px;
  background-color: gray;
  color: white;
  outline: none;
}

.searchInput {
  margin-top: 15px;
  outline: none;
  border: 1px solid #999999;
  border-radius: 20px;
  padding: 5px 15px;
}

.exclude{
  display: none;
}
</style>