<template>
  <div v-if="loader === false" class="div">
     <span>
      <Nav/>
     </span>
    <div class="card" v-if="allSecciones.length > 0">
      <aside v-for="item in allSecciones" :key="item._id">
      <div class="detail">
        
        <h1>{{ item.nombre.toUpperCase() }}</h1>
        <p>{{ item.descripcion }}</p>
      </div>
       <div class="acciones">
        
     <router-link  class="link" :to="`/presentacion/${item._id}`">
      <v-icon name = 'co-media-play' style="cursor: pointer; color: black;" />
     </router-link>

      <router-link class="link" :to="`/view/${item._id}`">
        <v-icon name = 'la-edit' style="cursor: pointer; color: black;" />
        </router-link>

      <span class="link">
        <v-icon name = 'md-deleteoutline-sharp' @click="hanledDelate(item._id)"  style="cursor: pointer; color: black; " />
      </span>
       </div>
    </aside>
    </div>
    <div v-else class="card">
     <h2 style="color: var(--color-complemetario);">No hay secciones</h2>
    </div>
    <!-- <button @click="handleSignOut">Cerrar sesión</button> -->
  </div>

   <div v-else class="loadig">
    <div  class="loader">
  
</div>
   </div>
</template>

<script setup>
import { onMounted, ref, computed,  } from 'vue';
import axiosClient from '../../axiosClient';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import Nav from './Nav.vue'

const router = useRouter();
const loader = ref(true)
const allSecciones = ref([])
const store = useStore()

const hanledDelate =  async (id) => {
  try {
    const result = await axiosClient.delete(`secciones/delate/${id}`)
    console.log(result.data);
   return  allSecciones.value = allSecciones.value.filter(s => s._id !== id)
  } catch (error) {
    console.log(error);
  }
}


// Observador de autenticación para mantener al usuario actualizado


// Función para cargar las secciones al montar el componente


const secciones = computed(() => store.state.secciones)
 allSecciones.value = secciones.value
onMounted( async () => {
  const user = computed(() => store.state.user)
  if(user.value === '') {
    console.log(user.value);
   return router.push('/')
  }
  setTimeout( async() => {
   
  try {
    const result = await axiosClient.get(`getSecciones?user=${user.value}`)
    store.commit('setSecciones', result.data)
    allSecciones.value = result.data
  } catch (error) {
    console.log(error);
  }
  loader.value = false;
  }, 3000) 
});


</script>




<style scoped>
.div {
    width: 95%;
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    gap: 50px;
}

aside {
  background-color: var(--color-complemetario);
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: 10px;
  display: inline-block;
}

.card {
 margin-top: 75px;
 margin-left: 35px;
 display: grid;
 grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  justify-content: center;
  align-items: center;
}

aside:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2); /* Agrega una sombra cuando se pasa el cursor por encima */
}

aside h1 {
    font-size: 17px;
    color: var(--color-t-primario);
    margin: 7px;
    margin-left: 17px;
    text-overflow: ellipsis;
}



aside p {
    font-size: 13px;
    color: black;
    margin-left: 15px;
    text-overflow: ellipsis;
}

.detail {
  height: 70%;
  height: 100px;
}

.acciones {
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  font-size: 17px;
}

.link {
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding-left: 2px;
  padding-bottom: 1px;
  transition: background-color 0.3s ease;
}

.link:hover {
  background-color: var(--color-t-terciario);
}

/* HTML: <div class="loader"></div> */
.loadig {
  display: flex;
  justify-content: center;
  padding-top: 280px;
  
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side, var( --color-t-cuarto) 95%,#0000) 50% 1px/12px 12px no-repeat,
    radial-gradient(farthest-side,#0000 calc(100% - 14px), var(--color-complemetario) 0);
  animation: l9 2s infinite linear;
}
@keyframes l9 {to{transform: rotate(1turn)}}




@media (min-width: 100px) and (max-width: 1190px) { 
  aside h1 {
    width: 100%;
    font-size: 18px;
}

.card {
 display: grid;
 grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, auto);
  margin-left: 0px;
}

aside {
  width: 83%;
}

@media (min-width: 100px) and (max-width: 600px) {
  .div {
    margin-left: 20px;
    
}
}

@media  (min-width: 100px) and ( max-width: 450px) {
  .div {
    margin-left: 6px ;
  }
}
 }
</style>