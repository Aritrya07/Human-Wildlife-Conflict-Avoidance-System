const url = "http://localhost:3000/api/updateflatowner";
const url2 = "http://localhost:3000/api/getoneflatowner?id="
const { createApp } = Vue

createApp({
    data() {
        id: null
        return {
            flatno: '',
            ownername: '',
            phone: '',
            email: '',
            noofmembers: '',
            towerid: '',
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
            this.flatno = response.data.flat_number
            this.ownername = response.data.owner_name
            this.phone = response.data.phone
            this.email = response.data.email
            this.noofmembers = response.data.no_of_members
            this.towerid = response.data.tower_id
            
        })
    },
    beforeDestroy() {

    },

    methods: {
        submitForm() {
            var tempJson = { id: this.id, flat_no: this.flatno, owner_name: this.ownername, phone: this.phone, email: this.email, no_of_members: this.noofmembers, tower_id: this.towerid };
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