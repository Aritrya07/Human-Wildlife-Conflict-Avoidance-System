const url = "http://localhost:3000/api/updatesecurityguard";
const url2 = "http://localhost:3000/api/getonesecurityguard?id="
const { createApp } = Vue

createApp({
    data() {
        id: null
        return {
            name: '',
            town: '',
            po: '',
            district: '',
            state: '',
            pin: '',
            email: '',
            password: '',
            phone: '',
            aadharno: '',
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
            this.name = response.data.name
            this.town = response.data.town
            this.po = response.data.po
            this.district = response.data.dist
            this.state = response.data.state
            this.pin = response.data.pin
            this.email = response.data.email
            this.password = response.data.password
            this.phone = response.data.phone
            this.aadharno = response.data.aadhar
            
        })
    },
    beforeDestroy() {

    },

    methods: {
        submitForm() {
            var tempJson = { id: this.id, name: this.name, town: this.town, PO: this.po, Dist: this.district, State: this.state, PIN: this.pin, email: this.email, password: this.password, phone: this.phone, aadhar_no: this.aadharno };
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
                    this.name = ""
                    this.town = ""
                    this.po = ""
                    this.district = ""
                    this.state = ""
                    this.pin = ""
                    this.email = ""
                    this.password = ""
                    this.phone = ""
                    this.aadharno = ""

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


}).mount('#app')