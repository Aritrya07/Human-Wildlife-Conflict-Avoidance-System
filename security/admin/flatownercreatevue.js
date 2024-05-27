const url = "http://localhost:3000/api/createflatowners";
const url2 = "http://localhost:3000/api/gettower";
const { createApp } = Vue

createApp({
    data() {
        return {
            options: [],
            flatno: '',
            ownername: '',
            phone: '',
            email: '',
            noofmembers: '',
            towerid: null,
            result: {}
        }
    },
    computed: {
    },
    created() {

    },
    mounted() {
        let headers = {
            "Content-Type": "application/json",
            "apikey": "aritryawildlife20230807",
        };
        axios.get(url2, {
            headers: headers,
        }).then(response => {
            this.options = response.data
        })
    },
    beforeDestroy() {

    },

    methods: {
        submitForm() {
            var tempJson = { flat_no: this.flatno, owner_name: this.ownername, phone: this.phone, email: this.email, no_of_members: this.noofmembers, tower_id: this.towerid };
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
                    this.flatno = ""
                    this.ownername = ""
                    this.phone = ""
                    this.email = ""
                    this.noofmembers = ""
                    this.towerid = ""

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


}).mount('#app')