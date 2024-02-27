<template>
    <div class="div">
       <div class="logo">
        <img src="../assets/logo.png" alt="logo">
        <h1>Question Builder</h1>
       </div>
       <div class="login">
        <img   @click="handleSignIn" class="imagen-style" src="../assets/google.png" alt="google">
        <button @click="handleSignIn" class="off-button" >Login
        <img src="https://cdn-icons-png.flaticon.com/128/12446/12446803.png" alt="lñogin" style="width: 12px;">
        </button>
       </div>
    </div>
</template>

<script setup>
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const stora = useStore();
const googleProvider = new GoogleAuthProvider()
const auth = getAuth()

const handleSignIn =  () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      if(result.user) {
        stora.commit("getUser", result.user.reloadUserInfo.email);
        router.push({
  path: "/secciones",
});
      }
    }).catch((err) => {
        console.log(err);
        alert('Hubo un error al iniciar seccion')
    });
}
</script>



<style scoped>

.div {
  width: 100%;
   display: flex;
    flex-direction: column;
    color: var( --color-complemetario);
    justify-content: center;
    align-items: center;
    margin-top: -100px;
    gap: 70px;
}

.login {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
    align-items: center;
  gap: 20px;
  
}



.imagen-style {
  width: 35px;
  border-radius: 100px;
  
  
}

.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 200px;
}

.off-button {
  background-color:  var(--color-t-cuarto); /* Green background */
  border: none; /* No borders */
  color: white; /* White text */
  padding: 15px 32px; /* Some padding */
  text-align: center; /* Centered text */
  text-decoration: none; /* No decoration */
  display: inline-block; /* Make it an inline-block element */
  font-size: 16px; /* Font size */
  margin: 4px 2px; /* Margins */
  cursor: pointer; /* Pointer on hover */
  border-radius: 12px; /* Rounded corners */
}

.off-button:hover {
  background-color: #3e8e41; /* Darker green on hover */
}

@media (max-width: 680px ) {
    .logo h1 {
      width: 400px;
      display: flex;
      justify-content: center;
    }
}
</style>