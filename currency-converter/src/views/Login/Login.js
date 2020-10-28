import axios from "axios";
export default {
    name: 'Login',
    data() {
        return {
            login: ''
        }
    },
    methods: {
        auth () {
            if(this.login === '') return;
            axios.get("http://46.101.212.195:3000/students/name/" + this.login).then((response) => {
                if (response.data === null) return;
                this.$store.commit('setUser', response.data);
                this.$router.push('/');
            })
        }
    }

}