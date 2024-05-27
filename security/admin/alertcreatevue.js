const url = "http://localhost:3000/api/createalert";
const url2 = "http://localhost:3000/api/getsecurityguard";
const url3 = "http://localhost:3000/api/getflatownersv2";
const url4 = "http://localhost:3000/api/getincidents";

const { createApp } = Vue

createApp({
    data() {
        return {
            options: [],
            options1: [],
            options2: [],
            title: '',
            description: '',
            alerttype: '',
            securityguardid: null,
            flatownerid: null,
            incidentid: null,
            alertdate: '',
            alerttime: '',
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
        axios.get(url3, {
            headers: headers,
        }).then(response => {
            this.options1 = response.data
        })
        axios.get(url4, {
            headers: headers,
        }).then(response => {
            this.options2 = response.data
        })
    },
    beforeDestroy() {

    },

    methods: {
        submitForm() {
            var tempJson = { title: this.title, description: this.description, alert_type: this.alerttype, security_guard_id: this.securityguardid, flat_owner_id: this.flatownerid, incident_id: this.incidentid, alert_date: this.alertdate, alert_time: this.alerttime };
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
                    this.alerttype = ""
                    this.securityguardid = ""
                    this.flatownerid = ""
                    this.incidentid = ""
                    this.alertdate = ""
                    this.alerttime = ""
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


}).mount('#app')