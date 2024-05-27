const url = "http://localhost:3000/api/monthlyreport?year=2007&month=07";
const { createApp } = Vue
      
createApp({    
  data() {
    id: null;
    return {
       
        results:[]
    }
},
    mounted() {
        // const urlParams = new URLSearchParams(window.location.search);
        let headers = {
            "Content-Type": "application/json",
            "apikey": "aritryawildlife20230807",
            
        };
        // this.id = urlParams.get('id')
        axios.get(url, {
            headers: headers,
        }).then(response => {
            this.results = response.data
        })
    } 
          
        
  
  
}).mount('#app')
