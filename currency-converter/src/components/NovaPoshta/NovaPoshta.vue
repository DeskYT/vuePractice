<template>
  <div class="novaposhtaContainer">
    <select v-model="selectedArea" v-on:change="getCities">
      <option v-for="area in areas" v-bind:key="area.Ref" v-bind:value="area.Ref">{{area.Description}}</option>
    </select>
    <input type="text" v-model="searchCity.request" v-on:focusin="handleSearchCityFocus" v-on:focusout="handleSearchCityFocus">
    <div class="citiesListContainer" v-if="searchCity.isSearching===true">
      <div class="cityContainer" v-for = "(city, index) in cities"
           v-bind:key="city.Ref"
           :class = "city.Description.toLowerCase().includes(searchCity.request.toLowerCase())
           || city.DescriptionRu.toLowerCase().includes(searchCity.request.toLowerCase()) ? '' : 'exclude'" v-on:click="handleCityChoosing(city)">
        {{city.Description}} {{index}}
      </div>
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
.citiesListContainer{
  max-height: 400px;
  overflow-y: scroll;
}
.cityContainer{
  cursor: pointer;
  user-select: none;
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