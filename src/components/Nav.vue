<template>
    <div class="nav">
      
       
         <img src="../assets/logo.png" alt="">
 
        <div class="add">
         <li class="sign-off-btn" v-for="(item, index)  in opcionsNav" :key="index" v-on:click="focusfun"  :style="{backgroundColor: claseAtive === item.name? '#089CA0': null}" >  
         <v-icon @click="dirigir(item.ruta)" style="font-size: small;" :name= "item.icon"/>  
      </li>
      <span @click="handleSignOut" class="off-button">
         <img src="https://cdn-icons-png.flaticon.com/128/3917/3917036.png" alt="">
      </span>
        </div>
    </div>
    
</template>


<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {auth} from '../main.js'
import { signOut } from 'firebase/auth';
const router = useRouter();
const store = useStore()


const opcionsNav = [

    {  icon: "bi-plus-lg", ruta: "/crear" },
   
]

const handleSignOut = async () => {
  await signOut(auth)
  .then((res) => {
    console.log('succes');})

    store.commit("getUser", '');
    const user = computed(() => store.state.user)
    router.push('/')
    .catch(error => {
      console.log(error);
    })
}

const claseAtive = ref('')

const dirigir  = (ruta) => {
  router.push(ruta)
}

const focusfun = () => {
   const currentRoute = router.currentRoute;
const currentUrl = currentRoute.value.fullPath;
claseAtive.value = currentUrl.toString()
 
}
</script>


<style scoped>
 .nav {
    background-color: var(--color-t-primario);
    width: 100%;
    position: fixed;
    z-index: 100;
    padding: 5px;
    color: var(--color-t-secundario);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
 }

 .nav img {
   width: 100px;
 }

 



.sign-off-btn {
  color: white;
  width: 65px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border-radius: 5px;
  background-color: #3e8e41 ;
  transition: background-color 0.3s ease;
  list-style: none;
  cursor: pointer;
}

.sign-off-btn:hover {
  background-color: #409b43;
}

 .add {
   display: flex;
   margin-right: 150px;
   gap: 40px;
   align-items: center;
 }

 .off-button {
  width:  35px;
  height: 35px;
  background-color: var(--color-t-cuarto); /* Green background */
  border: none; /* No borders */
  color: white; /* White text */
  text-align: center; /* Centered text */
  text-decoration: none; /* No decoration */
  display: flex; /* Make it an inline-block element */
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 12px; /* Font size */
  margin: 4px 2px; /* Margins */
  cursor: pointer; /* Pointer on hover */
  border-radius: 50%; /* Rounded corners */
}

.off-button:hover {
  background-color: var(--color-t-terciario); /* Darker green on hover */
}

.add img {
   width: 17px;
}

@media (min-width: 450px) and (max-width: 500px) {
  .nav {
    gap: 30px;
  }
}

@media (min-width: 372px) and (max-width: 450px) {
  .nav {
    gap: 60px;
  }
}

@media (min-width: 100px) and (max-width: 360px) {
  .nav {
    gap: 50px;
    margin-left: 0px;
  }

  .add {
    gap: 14px;
  }
}
</style>