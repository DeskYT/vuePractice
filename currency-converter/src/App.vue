<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
  <!--CurrencyConverter /-->
  <StudentsList />
  <CurrencyConverter />
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import CurrencyConverter from "@/components/CurrencyConverter/CurrencyConverter.vue";
import StudentsList from "@/components/StudentsList/StudentsList.vue";

export default {
  name: 'App',
  components: {
    //HelloWorld
    StudentsList,
    CurrencyConverter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
