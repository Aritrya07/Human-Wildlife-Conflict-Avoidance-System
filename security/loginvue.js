const url = "http://localhost:3000/api/securityguardlogin";
const { createApp } = Vue
      
createApp({    
    data() {
        return {
            email: '',
            password: '',
            result: {}
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {
    },

    methods: {
        submitForm() {
            var tempJson = { email: this.email, password: this.password };
            console.log("tempJson====", tempJson);
            let headers = {
                "Content-Type": "application/json",
                "apikey": "aritryawildlife20230807",
            };
            var apiUrl = url;
            axios.post(apiUrl, tempJson, {
                headers: headers,
            })
            .then((response) => {
                console.log(response);
                this.result = response.data
                this.email = ""
                this.password = ""
                if(response.data.code == '1') {
                    localStorage.setItem('id', response.data.idno);
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('email', response.data.email);
                    window.location.href="security_home.html"
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}).mount('#app')