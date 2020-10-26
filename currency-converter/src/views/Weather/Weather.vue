<template>
  <div class="weatherContainer">
    <div class="citiesContainer">
      <div class="addCityContainer citySelector">
        <div class="selectorName">Добавление города</div>
        <div class="selectorSubName">Введите название города:</div>
        <input class="cityName" type="text" v-model="addingCity" placeHolder="Введите название города">
        <div class="weatherButton" @click="addCityHandler">Добавить</div>
      </div>
      <div class="chooseCityContainer citySelector">
        <div class="selectorName">Выбор города</div>
        <div class="selectorSubName">Выберите город:</div>
        <select class="cityName">
          <option v-for="city in addedCities" v-bind:key="city.name" v-bind:value="city">{{city.name}}</option>
        </select>
        <div class="weatherButton">Погода</div>
      </div>
    </div>
    <template v-for="(city) in addedCities" v-bind:key="city">
      <div style="color: white" class="cityInfo" v-if="city.weather">
        <table>
          <tr>
            <td>{{city.name}}</td>
            <td>{{city.weather.sys.country}}</td>
            <td>{{`[${city.coord.lat}; ${city.coord.lon}]`}}</td>
          </tr>
          <tr>
            <td><img class="iconBlock" src="./assets/icons/humidity.svg" alt=""></td>
            <td>humidity</td>
            <td>{{city.weather.main.humidity}}</td>
          </tr>
          <tr>
            <td><img class="iconBlock" src="./assets/icons/temperature.svg" alt=""></td>
            <td>temp</td>
            <td>{{roundTemp(city.weather.main.temp - 273)}}</td>
          </tr>
          <tr>
            <td>
              <img class="iconBlock" v-bind:src="'/static/icons/DayPack/' + city.weather.weather[0].icon + '.svg'" alt="">
            </td>
            <td>Main</td>
            <td>{{city.weather.weather[0].description}}</td>
          </tr>
          <tr>
            <td>
              <img class="iconBlock" src="./assets/icons/pressure.svg" alt="">
            </td>
            <td>Pressure</td>
            <td>1020 hpa</td>
          </tr>
        </table>
      </div>
    </template>
  </div>
</template>
<script defer src="@/views/Weather/Weather.js"></script>
<style lang="scss">@import "src/views/Weather/Weather";</style>