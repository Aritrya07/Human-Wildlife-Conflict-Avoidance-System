const url = "http://mcatutorials.com/mailsend/create.php";
const { createApp } = Vue

createApp({
    data() {
        return {
            name: '',
            email: '',
            subject: '',
            mailbody: '',
            message: '',
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
            this.subject = this.name + "wants to contact you.";
            this.mailbody = "Name: " + this.name + "<br>Email: " + this.email + "<br>Message: " + this.message;

            var tempJson = { form_name: this.name, cemail: "aritrya.7.senapati@gmail.com", subject: this.subject, mailbody: this.mailbody};
            console.log("tempJson====", tempJson);

            let headers = {
                "Content-Type": "application/json",
                "apikey": "RBMAILSENDV2",
            };


            var apiUrl = url;

            axios.post(apiUrl, tempJson, {
                    headers: headers,
                })
                .then((response) => {

                    console.log(response);
                    this.result = response.data

                    this.name = ""
                    this.email = ""
                    this.message = ""
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


}).mount('#app')