<template>
  <div class="studentContainer">
      <img class="studentAvatar" v-on:click="showScaledAvatar = true" :src="student.photo" alt="">
    <div class="infoContainer">
      <h2>{{student.name}}</h2>
      <div class="detailedInfo">
        <div>Группа: {{student.group}}</div>
        <div>Оценка: {{student.mark}}</div>
        <div>{{student.isDonePr ? 'Сдал': 'Не сдал'}}</div>
      </div>
    </div>
  </div>
  <h4 style="margin-top: 15px">Всего студентов: {{studentsCount}}</h4>
  <StudentAvatar v-if="showScaledAvatar" :photo="student.photo" @close="showScaledAvatar = false" />
</template>
<script defer src="@/components/StudentInfo/StudentInfo.js"></script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
.studentContainer{
  margin-top: 50px;
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #2c3e50;
  color: white;
  width: 600px;
  border-radius: 20px;
  justify-content:flex-start;
  padding: 20px 30px;
  cursor: pointer;
  user-select: none;
}
.studentAvatar{
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 20%;
}
.infoContainer{
  margin-top: 20px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.detailedInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
}
.btn {
  font-size: 16px;
  padding: 6px 10px;
  border: 0;
  border-radius: 15px;
  background-color: gray;
  color: white;
  outline: none;
}

</style>