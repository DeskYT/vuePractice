import axios from "axios";
const HOST = "46.101.212.195:3000";
export default {
    name: 'StudentsList',
    data() {
        return {
            students: [],
            coincidence: "",
            newStudent: {}
        }
    },
    mounted: function () {
        this.getStudents();
    },
    methods: {
        showForm: ()=>{
            const form = document.querySelector(".addStudentForm");
            form.style.display = "flex";
        },
        hideForm: ()=>{
            const form = document.querySelector(".addStudentForm");
            form.style.display = "none";
        },
        getStudents: function () {
            axios.get(`http://${HOST}/students`).then(response => {
                console.log(response.data)
                this.students = response.data
            });
            this.students = this.students.map(it=>{
                it.isEditing = false;
                return it;
            })
        },
        addStudent: function (){
            axios.post(`http://${HOST}/students`, this.newStudent).then(response => {
                console.log(response.data);
                this.getStudents();
                this.newStudent = {};
                this.hideForm();
            });
        },
        editStudent: function (index){
            this.students[index].isEditing = true;
        },
        updateStudent (student){
            axios.put(`http://${HOST}/students/${student._id}`, student).then(response => {
                console.log(response.data)
                this.getStudents();
            });
        },
        deleteStudent: function (id){
            axios.delete(`http://${HOST}/students/${id}`).then(response => {
                console.log(response.data)
                this.getStudents()
            });
        }
    }

}