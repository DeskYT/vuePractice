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
        /*checkStudentsList: function(prev, cur){
            if (cur === prev) return;
            if (cur.length !== prev.length){
                cur.forEach(it=>this.deleteStudent(it._id));

                prev.forEach(it=>{
                    this.postStudent({
                        name: it.name,
                        group: it.group,
                        mark: it.mark,
                        isDonePr: it.isDonePr,
                        photo: it.photo
                    })
                });
                console.log(prev)
            }


        },*/
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
                /* const prev = this.students;
               if(prev.length !== 0){
                    this.students = response.data;
                    const cur = this.students
                    this.checkStudentsList(prev, cur);
                    return;
                }*/
                this.students = response.data;
            });
        },
        imageSelect: function(e) {
            e.preventDefault()
             const file = e.target.files[0]
            const newStudent = this.newStudent
            if (file) {
                const reader = new FileReader();
                reader.onloadend = function (e) {
                    newStudent.photo = e.target.result
                }
                reader.readAsDataURL(file);
            }
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
        addStudent(){
            this.postStudent(this.newStudent);
            this.newStudent = {};
        },
        postStudent: function (student){
            axios.post(`http://${HOST}/students`, student).then(response => {
                console.log(response.data);
                if(this.validateStudent(response.data))
                    this.students.push(response.data)
                else
                    alert(`${response.data.name}: ${response.data.message}`)
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