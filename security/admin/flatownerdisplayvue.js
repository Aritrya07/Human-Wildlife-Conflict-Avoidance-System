const url = "http://localhost:3000/api/getflatownersv2";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
    
        results:[]
    }
},
    mounted() {
        let headers = {
            "Content-Type": "application/json",
            "apikey": "aritryawildlife20230807",
            
        };
        axios.get(url, {
            headers: headers,
        }).then(response => {
            this.results = response.data
        })
    }
          
        
  
  
}).mount('#app')
