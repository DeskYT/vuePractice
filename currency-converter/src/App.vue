<template>
  <div id="nav">
    <router-link to="/">Students List</router-link> |
    <router-link to="/currencyconverter">Currency Converter</router-link> |
    <router-link to="/novaposhta">Нова Пошта</router-link> |
    <router-link to="/weather">Погода</router-link>
  </div>
  <router-view/>
</template>

<style>
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#nav {
  width: 100%;
  padding: 30px;
  background-color: #2c3e50;
  color: white;
}

#nav a {
  font-weight: bold;
  /*color: #2c3e50;*/
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
