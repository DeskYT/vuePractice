import axios from "axios";
import StudentAvatar from "@/components/StudentAvatar/StudentAvatar.vue";
const HOST = "46.101.212.195:3000";
export default {
    name: 'StudentsList',
    data() {
        return {
            students: [],
            editingStudent: null,
            coincidence: "",
            newStudent: {},
            scaledAvatar: {
                show: false,
                photo: ""
            },
        }
    },
    computed:{
        studentsCount () {
            return this.$store.getters.getCount
        },
        theme (){
            return this.$store.getters.getTheme
        },
        nullify (){
            return this.$store.getters.getNullify
        },
        filtered (){
            return this.students.filter(it=>{
                const stud = {...it}
                stud.name = stud.name ? stud.name: '';
                stud.group = stud.group ? stud.group: '';
                return stud.name.toLowerCase().includes(this.coincidence.toLowerCase()) || stud.group.toLowerCase().includes(this.coincidence.toLowerCase())
            })
        }
    },
    components: {StudentAvatar},
    mounted: function () {
        this.getStudents();
        const test = async () => this.getStudents();
        setInterval(test, 1000);
    },
    methods: {
        changeTheme: function(){
            this.$store.commit('setTheme', !this.$store.getters.getTheme);
        },
        toggleNullify: function(){
            this.$store.commit('setNullify', !this.$store.getters.getNullify);
        },
        checkStudentsList: function(prev, cur){
            console.log(cur, prev)
            if (cur === prev) return;
            //if (cur.length !== prev.length){
                cur.forEach(it=>{
                    if(!this.curInclude(it)){
                        console.log(it)
                        this.nullifyStudent(it)
                    }
                });
                console.log(prev)
           // }
        },
        curInclude: function(obj){
            let res = false
            this.students.forEach(it=>{
                if (obj.name === it.name && obj.photo === it.photo && obj.group === it.group && obj.mark === it.mark && obj.isDonePr === it.isDonePr)
                    return res = true;
            })
            return res;
        },
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
                if(this.$store.getters.getNullify){
                    //console.log("NULLIFY: ", this.$store.getters.getNullify)
                    const prev = this.students;
                    if(prev.length !== 0){
                        const cur = response.data
                        //if(prev.length !== cur.length){
                            this.checkStudentsList(prev, cur);
                        //}
                    }
                }
                /*this.students = []
                response.data.forEach(it=>{
                    if(it.name === null) it.name = '';
                    if(it.group === null) it.group = '';
                    this.students.push(it)
                })*/
                this.students = response.data;
                this.$store.commit('setCount', this.students.length);
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
        handleScaledAvatar: function(photo){
          this.scaledAvatar.photo = photo;
          this.scaledAvatar.show = true;
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
        editStudent: function (student){
            this.editingStudent = student._id;
            this.newStudent = {...student};
        },
        nullifyStudent (stud){
            //this.newStudent.isDonePr = null;
            //this.newStudent.name = null;
            const empty = {
                name: null,
                group: null,
                mark: null,
                isDonePr: null,
                photo: null,
                __v: null,
            }
            axios.put(`http://${HOST}/students/${stud._id}`, empty).then(response => {
                console.log(response.data)
                if(this.validateStudent(response.data))
                    this.students[this.editingStudent] = response.data;
                else
                   console.log(`${response.data.name}: ${response.data.message}`)
                this.editingStudent = null;
                this.newStudent = {};
            });
        },
        updateStudent (){
            /*delete this.newStudent.photo
            delete this.newStudent.name*/
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