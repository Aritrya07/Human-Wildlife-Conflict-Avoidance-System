const url = "http://localhost:3000/api/adminlogin";
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
                    localStorage.setItem('adminemail', response.data.email);
                    localStorage.setItem('adminrole', response.data.role);
                    window.location.href="admin-home.html"
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}).mount('#app')