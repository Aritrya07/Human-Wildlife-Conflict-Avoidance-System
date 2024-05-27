const url = "http://localhost:3000/api/createtower";
const { createApp } = Vue

createApp({
    data() {
        return {
            towername: '',
            description: '',
            no_of_flats: '',
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
            var tempJson = { tower_name: this.towername, description: this.description, no_of_flats: this.no_of_flats };
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

                    this.towername = ""
                    this.description = ""
                    this.no_of_flats = ""
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


}).mount('#app')