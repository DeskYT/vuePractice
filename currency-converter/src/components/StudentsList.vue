<template>
  <div class="studentsContainer">
    <h1>Студенти</h1>

    <input class="searchInput" type="text" v-model = "coincidence" placeholder="Поиск" size = 35>
    <table border = '1'>
      <thead>
      <th>№</th>
      <th>ФИО</th>
      <th>Группа</th>
      <th>Сдал\Не сдал</th>
      </thead>
      <tbody>
      <tr v-for = "(stud, index) in students" v-bind:key="index" :class = "stud.name.toLowerCase().includes(coincidence.toLowerCase()) || stud.group.toLowerCase().includes(coincidence.toLowerCase()) ? '' : 'exclude'">
        <td>{{ index }}</td>
        <td>{{ stud.name }}</td>
        <td>{{ stud.group }}</td>
        <td>
          <input type="checkbox" :checked = "stud.offset" disabled>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'StudentsList',
  data() {
    return {
      students: [],
      coincidence: ""
    }
  },
  mounted: function () {
    axios.get("http://46.101.212.195:3000/students").then(response => {
      console.log(response.data)
      this.students = response.data
    });
  },
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
.studentsContainer{
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
.addStudentForm{
  flex-direction: column;
  display: none;
}
.addStudentForm > *{
  margin-top: 10px;
  border-radius: 15px;
  padding: 5px;
  outline: none;
}
.exclude{
  display: none;
}
</style>