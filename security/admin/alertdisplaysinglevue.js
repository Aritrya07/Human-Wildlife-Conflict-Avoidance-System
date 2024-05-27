const url = "http://localhost:3000/api/detailedreport?id=";
const { createApp } = Vue
      
createApp({    
  data() {
    id: null;
    return {
       
        result:[]
    }
},
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        let headers = {
            "Content-Type": "application/json",
            "apikey": "aritryawildlife20230807",
            
        };
        this.id = urlParams.get('id')
        axios.get(url+this.id, {
            headers: headers,
        }).then(response => {
            this.result = response.data
        })
    } 
          
        
  
  
}).mount('#app')
