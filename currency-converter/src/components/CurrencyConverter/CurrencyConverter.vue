<template>
  <div class="converterContainer">
    <h2>Currency Converter</h2>
    <input type="text" v-model="conversion.amount" placeholder="Enter Amount">
    <span>Convert From</span>
    <select v-model="conversion.currencyFrom">
      <option v-for="exchange in currencyRates" v-bind:key="exchange.ccy" v-bind:value="exchange">{{exchange.ccy}}</option>
      <option v-bind:value="currencyUAH">{{currencyUAH.ccy}}</option>
    </select>
    <span>Convert To</span>
    <select v-model="conversion.currencyTo">
      <option v-for="exchange in currencyRates" v-bind:key="exchange.ccy" v-bind:value="exchange">{{exchange.ccy}}</option>
      <option v-bind:value="currencyUAH">{{currencyUAH.ccy}}</option>
    </select>
    <div v-text="conversion.message"></div>
  </div>
</template>

<script defer src="@/components/CurrencyConverter/CurrencyConverter.js"></script>
<style scoped>

</style>