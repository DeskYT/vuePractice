import axios from "axios";
import StudentAvatar from "@/components/StudentAvatar/StudentAvatar.vue";
const HOST = "46.101.212.195:3000";
export default {
    name: 'StudentInfo',
    data() {
        return {
            student: {
                name: "",
                photo: "",
                mark: 0,
                isDonePr: false,
            },
            showScaledAvatar: false,
            editingStudent: null,
        }
    },
    components: {StudentAvatar, props: true},
    props: {
        id: '',
    },

    mounted: function () {
        this.getStudent();
        /*const test = async () => {
            this.getStudent();
        }
        setInterval(test, 1000);*/
    },
    methods: {
        getStudent: function () {
            axios.get(`http://${HOST}/students/${this.id}`).then(response => {
                console.log(response.data)
                this.student= response.data
            });
        },

    }

}