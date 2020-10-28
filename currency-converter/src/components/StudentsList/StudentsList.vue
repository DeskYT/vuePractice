<template>
  <div class="studentsContainer">
    <h1>Студенти</h1>
    <link rel="stylesheet" :href="`/static/css/${theme ? 'style1' : 'style2'}.css`">
    <button class="btn" @click="toggleNullify()" v-if="nullify">Выключить нуллификацию</button>
    <button class="btn" @click="toggleNullify()" v-else>Включить нуллификацию</button>
    <button class="btn" @click="changeTheme()">Изменить стиль</button>
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
    <h4 style="margin-top: 15px">Всего студентов: {{studentsCount}}</h4>
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
      <th>Обнулить</th>
      </thead>
      <tbody>
      <tr v-for = "(stud, index) in filtered" v-bind:key="stud._id">
        <td>{{ index }}</td>
        <template v-if="editingStudent !== stud._id">
          <td><img style="width: 100px; height: 100px" v-on:click="handleScaledAvatar(stud.photo)" v-bind:src="stud.photo" alt=""></td>
          <td>
            <router-link v-bind:to="'/student-info/'+stud._id">
              {{ stud.name }}
            </router-link>
          </td>
          <td>{{ stud.group }}</td>
          <td>{{ stud.mark }}</td>
          <td><input type="checkbox" :checked = "stud.isDonePr" disabled></td>
          <td><button class="btn" type="button" @click = "editStudent(stud)">Изменить</button></td>
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
        <td><button class="btn" type="button" @click = "nullifyStudent(stud)">Обнулить</button></td>
      </tr>
      </tbody>
      <StudentAvatar v-if="scaledAvatar.show" :photo="scaledAvatar.photo" @close="scaledAvatar.show = false" />
    </table>
    <div v-if="theme">THEME TRUE</div>
    <div>{{theme}}</div>
  </div>
</template>

<script defer src="@/components/StudentsList/StudentsList.js"></script>
<style>
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
  width: 100%;
  min-height: 100vh;
}
table {
  margin-top: 15px;
  background-color: rgba(185, 210, 217, 0.7);
}
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
.btn + .btn{
  margin-top: 15px;
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