import axios from "axios";
const HOST = "46.101.212.195:3000";
export default {
    name: 'StudentsList',
    data() {
        return {
            students: [],
            editingStudent: null,
            coincidence: "",
            newStudent: {}
        }
    },
    mounted: function () {
        this.getStudents();
        const test = async () => {
            this.getStudents();
        }
        setInterval(test, 1000);
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
                this.students = response.data;
            });

        },
        getProp: function (o, container) {
            for(const prop in o) {
                container[prop] = o[prop]
            }
            return container;
        },
        validateStudent: function (stud) {
            try {
                let isValid = true;
                const properties = new Map()
                properties.set("photo", "string")
                properties.set("mark", "number")
                properties.set("isDonePr", "boolean")
                properties.set("_id", "string")
                properties.set("name", "string")
                properties.forEach((type, key) => {
                    if (!Object.prototype.hasOwnProperty.call(stud,key) || typeof(stud[key]) !== type){
                        isValid = false;
                        return;
                    }
                });
                return isValid;

            } catch (e){console.error(e)}
        },
        addStudent: function (){
            axios.post(`http://${HOST}/students`, this.newStudent).then(response => {
                console.log(response.data);
                //this.getStudents();
                if(this.validateStudent(response.data))
                    this.students.push(response.data)
                else
                    alert(`${response.data.name}: ${response.data.message}`)
                this.newStudent = {};
                this.hideForm();
            });
        },
        editStudent: function (index){
            this.editingStudent = index;
            this.newStudent = {...this.students[index]};
        },
        updateStudent (){
            axios.put(`http://${HOST}/students/${this.newStudent._id}`, this.newStudent).then(response => {
                console.log(response.data)
                if(this.validateStudent(response.data))
                    this.students[this.editingStudent] = response.data;
                else
                    alert(`${response.data.name}: ${response.data.message}`)
                this.editingStudent = null;
                this.newStudent = {};
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