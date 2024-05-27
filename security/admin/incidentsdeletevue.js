const url = "http://localhost:3000/api/deleteincidents?id=";
const { createApp } = Vue

createApp({
    data() {
        id: null
        return {
            result: {}
        }
    },
    mounted() {
        let headers = {
            "Content-Type": "application/json",
            "apikey": "aritryawildlife20230807",
            
        };
        const urlParams = new URLSearchParams(window.location.search)
    	this.id = urlParams.get('id')
        axios.delete(url+this.id, {
            headers: headers,
        }).then(response => {
            this.result = response.data
        })
    }

}).mount('#app')