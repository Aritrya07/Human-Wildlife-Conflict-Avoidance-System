const { createApp } = Vue
      
createApp({    
    data() {
        return {
            result: {}
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        localStorage.setItem('id', "");
        localStorage.setItem('name', "");
        localStorage.setItem('email', "");
        window.location.href="index.html"
    },
    beforeDestroy() {
    },

    methods: {
    }
}).mount('#app')