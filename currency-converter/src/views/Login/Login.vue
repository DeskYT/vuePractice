<template>
  <div class="loginContainer">
    <input v-model="login" placeholder="Введите имя">
    <button @click="auth()">Войти</button>
  </div>
</template>

<script defer src="@/views/Login/Login.js"></script>

<style lang="sass" scoped>
  .loginContainer
    margin-top: 15px
    button
      margin-left: 10px
      padding: 5px 10px
      cursor: pointer
    input
      padding: 5px 10px
</style>