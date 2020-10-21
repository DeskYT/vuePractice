<template>
  <div class="studentsContainer">
    <h1>Студенти</h1>
    <button class="btn" v-on:click="showForm">Добавить студента</button>
    <form class="addStudentForm" onsubmit="return false;">

      <input type="text" placeholder="ФИО" v-model.trim="newStudent.name">
      <input placeholder="Группа" type="text" v-model.trim="newStudent.group">
      <label>
        <span>Сдал</span>
        <input placeholder="Сдал" type="checkbox" v-model="newStudent.isDonePr">
      </label>
      <input class="btn" type="submit" v-on:click="addStudent" value="Добавить">
    </form>
    <input class="searchInput" type="text" v-model = "coincidence" placeholder="Поиск" size = 35>
    <table border = '1'>
      <thead>
      <th>№</th>
      <th>Фото</th>
      <th>ФИО</th>
      <th>Группа</th>
      <th>Оценка</th>
      <th>Сдал\Не сдал</th>
      <th>Изменить</th>
      <th>Удалить</th>
      </thead>
      <tbody>
      <tr v-for = "(stud, index) in students" v-bind:key="stud._id" :class = "stud.name.toLowerCase().includes(coincidence.toLowerCase()) || stud.group.toLowerCase().includes(coincidence.toLowerCase()) ? '' : 'exclude'">
        <td>{{ index }}</td>
        <template v-if="editingStudent !== index">
          <td><img style="width: 100px; height: 100px" v-bind:src="stud.photo" alt=""></td>
          <td>{{ stud.name }}</td>
          <td>{{ stud.group }}</td>
          <td>{{ stud.mark }}</td>
          <td><input type="checkbox" :checked = "stud.isDonePr" disabled></td>
          <td><button class="btn" type="button" @click = "editStudent(index)">Изменить</button></td>
        </template>
        <template v-else>
          <td>
            <input type="text" v-model="newStudent.photo">
            <input type="file" id="file" name="file" @change="imageSelect"
                   accept=".jpg, .jpeg, .png, .gif">
          </td>
          <td><input type="text" v-model="newStudent.name"></td>
          <td><input type="text" v-model="newStudent.group"></td>
          <td><input type="text" v-model="newStudent.mark"></td>
          <td><input type="checkbox" v-model="newStudent.isDonePr" ></td>
          <td><button class="btn" type="button" @click = "updateStudent()">Сохранить</button></td>
        </template>
        <td><button class="btn" type="button" @click = "deleteStudent(stud._id)">Удалить</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script defer src="@/components/StudentsList/StudentsList.js"></script>
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