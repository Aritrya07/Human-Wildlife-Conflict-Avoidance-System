const url = "http://localhost:3000/api/createsecurityguard";
const uploadurl = "http://localhost:3000/api/uploadimage";
const { createApp } = Vue

createApp({
    data() {
        return {
            selectedFile: null,
            message: '',
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
            picture: '',
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

        onFileChange(event) {
            this.selectedFile = event.target.files[0];
        },

        submitForm() {

            if (!this.selectedFile) {
                this.message = 'Please select a file to upload';
                return;
            }

            const formData = new FormData();
            formData.append('picture', this.selectedFile);
            
            axios.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "apikey": "aritryawildlife20230807",
                    },
                })
                .then((response) => {
                    this.message = response.data;

                    this.picture = response.data.filename;

                    var tempJson = { name: this.name, town: this.town, PO: this.po, Dist: this.district, State: this.state, PIN: this.pin, email: this.email, password: this.password, phone: this.phone, aadhar_no: this.aadharno, picture: this.picture };
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
                            this.picture = ""
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    this.selectedFile = null;
                })
                .catch((error) => {
                    console.error('Error uploading picture:', error);
                    this.message = 'An error occurred while uploading the picture';
                });


        }
    }


}).mount('#app')