const url = "http://localhost:3000/api/updatetowers";
const url2 = "http://localhost:3000/api/getonetower?id="
const { createApp } = Vue

createApp({
    data() {
        id: null
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
        const urlParams = new URLSearchParams(window.location.search)
    	this.id = urlParams.get('id')
        let headers = {
            "Content-Type": "application/json",
            "apikey": "aritryawildlife20230807",
            
        };
        axios.get(url2+this.id, {
            headers: headers,
        }).then(response => {
            this.towername = response.data.name
            this.description = response.data.tower_description
            this.no_of_flats = response.data.no_of_flats
            
        })
    },
    beforeDestroy() {

    },

    methods: {
        submitForm() {
            var tempJson = { id: this.id, tower_name: this.towername, description: this.description, no_of_flats: this.no_of_flats };
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