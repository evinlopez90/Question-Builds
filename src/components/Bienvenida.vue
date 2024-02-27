<template>
    <div class="welcome-page">
      <div class="banner">
        
        

      </div>
      <div class="loging">
       <Aut/>
      </div>
    </div>
  </template>
  
  <script setup>
   import Aut from './Aut.vue'
  </script>
  
  <style scoped>
  .welcome-page {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .banner {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -90px;
    background-image: url('../assets/baner.jpg');
    background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  }
  

  
  .banner-text {
   width: 60%;
   height: 100%;
   display: flex;
   flex-direction: column;
    justify-content: center;
    align-items: center;
   
  }
  
  
  
  .banner p {
    font-size: 12px;
    padding-top: 5px;
    font-weight: 500;
    line-height: 1.3;
    color: var(  --color-t-terciario);
  }

  .loging {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
     background-color: var(--color-t-primario);
  }

  @media  (max-width: 1024px) {
    .banner {
      display: none;
    }
  }

  
  </style>
  