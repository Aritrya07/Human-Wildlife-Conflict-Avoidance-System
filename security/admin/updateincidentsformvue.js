const url = "http://localhost:3000/api/updateincidents";
const url2 = "http://localhost:3000/api/getoneincidents?id="
const { createApp } = Vue

createApp({
    data() {
        id: null
        return {
            title: '',
            description: '',
            date: '',
            time: '',
            sevieritylevel: '',
            sourceofinformation: '',
            type: '',
            result: {}
        }
    },
    computed: {
    },
    created() {

    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search)
    	this.id = urlParams.get('id')
        let headers = {
            "Content-Type": "application/json",
            "apikey": "aritryawildlife20230807",
            
        };
        axios.get(url2+this.id, {
            headers: headers,
        }).then(response => {
            this.title = response.data.title
            this.description = response.data.description
            this.date = response.data.date
            this.time = response.data.time
            this.sevieritylevel = response.data.sevierity
            this.sourceofinformation = response.data.source
            this.type = response.data.type
            
        })
    },
    beforeDestroy() {

    },

    methods: {
        submitForm() {
            var tempJson = { id: this.id, title: this.title, description: this.description, date: this.date, time: this.time, sevierity_level: this.sevieritylevel, source_of_info: this.sourceofinformation, type: this.type };
            console.log("tempJson====", tempJson);
            let headers = {
                "Content-Type": "application/json",
                "apikey": "aritryawildlife20230807",
                
            };

            var apiUrl = url;

            axios.patch(apiUrl, tempJson, {
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