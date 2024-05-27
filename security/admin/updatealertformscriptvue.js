const url = "http://localhost:3000/api/updatealert";
const url2 = "http://localhost:3000/api/getonealerts?id="
const { createApp } = Vue

createApp({
    data() {
        id: null
        return {
            title: '',
            description: '',
            alerttype: '',
            securityguardid: '',
            flatownerid: '',
            incidentid: '',
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
            this.alerttype = response.data.alert_type
            this.securityguardid = response.data.security_guard_id
            this.flatownerid = response.data.flat_owner_id
            this.incidentid = response.data.incident_id
            this.alertdate = response.data.alert_date
            this.alerttime = response.data.alert_time
        })
    },
    beforeDestroy() {

    },

    methods: {
        submitForm() {
            var tempJson = { id: this.id, title: this.title, description: this.description, alert_type: this.alerttype, security_id: this.securityguardid, flat_owner_id: this.flatownerid, incident_id: this.incidentid, date: this.alertdate, time: this.alerttime };
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