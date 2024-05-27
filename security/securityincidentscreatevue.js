const url = "http://localhost:3000/api/createincidents";
const { createApp } = Vue

createApp({
    data() {
        sourceofinformation: ''
        return {
            title: '',
            description: '',
            date: '',
            time: '',
            sevieritylevel: '',
            type: '',
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
            this.sourceofinformation = localStorage.getItem("id");
            var tempJson = { title: this.title, description: this.description, date: this.date, time: this.time, sevierity_level: this.sevieritylevel, source_of_info: this.sourceofinformation, type: this.type };
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

                    this.title = ""
                    this.description = ""
                    this.date = ""
                    this.time = ""
                    this.sevieritylevel = ""
                    this.sourceofinformation = ""
                    this.type = ""
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


}).mount('#app')