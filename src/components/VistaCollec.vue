<template >
    <div v-if="loader === false">
      <div class="final" v-if="intanc === 4">
         <span> {{ creado }}</span>
         <aside class="asi">
         <button @click="regresar">Salir</button>
         </aside>
      </div>
    <div class="container" v-if="intanc < 4">
    <aside class="encabezado">
    <h1>Edita los datos de la seccion como quieras</h1>
    </aside>
    <aside class="editInfo">
      <span class="info">
        <div class="nombre">
        <label for="">Nombre</label>
        <input type="text" v-model="theSeccion.nombre"  >
      </div>
      
      <div class="descrip">
        <label for="">Descripcion</label>
       <textarea  cols="40" rows="3" v-model="theSeccion.descripcion" ></textarea>
      </div>

      <div class="preguntas">
        <h1>Elige la pregunta que quieras editar</h1>
      
        <section class="cajas" v-if="intanc === 0">
          <aside  @click="hanledPreguntas(index, 1)" v-for="(item, index)  in theSeccion.preguntas" :key="item._id">
           <p> {{ item.pregunta }}</p>
          </aside>
        </section>

        <section class="one" v-if="intanc === 1">
        <input type="text" v-model="theSeccion.preguntas[index].pregunta"  >
        <span>
          <button @click="instance(0)">Atras</button>
          <button @click="instance(2)">Sigueinte</button>
        </span>
        </section>
       
        <section class="two" v-if="intanc === 2">
          <div>
            <input v-for="(item, i) in theSeccion.preguntas[index].respuestas" type="text" v-model="theSeccion.preguntas[index].respuestas[i]" :key="i" >
          </div>
         <span>
          <button @click="instance(1)">Atras</button>
          <button @click="instance(3)">Sigueinte</button>
         </span>
        </section>

        <section class="tree" v-if="intanc === 3">
           <div>
            <p style="cursor: pointer;" v-for="(item, i) in theSeccion.preguntas[index].respuestas" :key="i" @click="edict(theSeccion.preguntas[index].respuestas[i])">
            {{ item }}   <v-icon  v-if="theSeccion.preguntas[index].respuestaCorrecta === item" name="io-checkmark-done-circle-sharp" />
           </p>
           </div>
          <span>
            <button @click="instance(2)">Atras</button>
            <button @click="instance(0)" >Listo</button>
          </span>
          
        </section>

      </div>
      </span>

      <div class="buts">
        <button @click="hanledUndate('guardar')">Guardar</button>
        <button @click="hanledUndate('cancelar')">Cancelar</button>
      </div>

    </aside>
    </div>
    </div>
    <div v-else class="loadig">
      <div class="loader">

      </div>
    </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import axiosClient from "../../axiosClient";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const stora = useStore()
const route = useRoute();
import { useRouter } from 'vue-router';
const router = useRouter();
const theSeccion = ref({})
const defaultSeccion = ref({});
const index = ref(0)
const intanc = ref(0)
const creado = ref('')
const loader = ref(true)
function edict (value) {
theSeccion.value.preguntas[index.value].respuestaCorrecta = value 
}

const seccion = computed( () => stora.state.seccion)
theSeccion.value = seccion.value
function instance (value) {
  intanc.value = value
}

function regresar () {
  router.go(-1)
}

const hanledPreguntas = (i, value) => {
   index.value = i
   instance(value)
  
   return
}
async function hanledUndate (value) {
   if(value === 'guardar') {
    try {
     const data =  theSeccion.value
     console.log(data);
    const result =  await axiosClient.put(`secciones/update/${route.params.id}`, data)
    //  stora.commit('getSeccion', result.data)
    //  theSeccion.value = result.data
     console.log(result.data);
     creado.value = '¡Hecho!'
     intanc.value = 4
  } catch (error) {
    console.log(error);
  }
   } 

   if(value === 'cancelar') {
    
    try {
    const result =  await axiosClient.get(`getSecciones/${route.params.id}`)
   stora.commit('getSeccion', result.data)
   theSeccion.value = result.data
   console.log(theSeccion.value);
   
  router.go(-1)

  } catch (error) {
    console.log(error);
  }
   
   }

}


onMounted( async() => {

  const user = computed(() => stora.state.user)
  if(user.value === '') {
   console.log(user.value);
   return router.push('/')
  }
  setTimeout( async() => {
    try {
    const result =  await axiosClient.get(`getSecciones/${route.params.id}`)
    
   stora.commit('getSeccion', result.data)
   theSeccion.value = result.data
   defaultSeccion.value = result.data

  } catch (error) {
    console.log(error);
  }
    loader.value = false
  }, 2000)
  
})

</script>


<style scoped>
    .container {
      margin-top: 60px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;  
    }
.encabezado {
  height: auto;
  width: 100%; 
  display: flex;
  justify-content: center;
}

.encabezado h1 {
  font-size: 25px;
  color: var(--color-complemetario);
}
.editInfo {
  width: auto;
  height: 80vh ;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}


.nombre input {
  width: 300px;
  height: 25px;
  padding: 10px;
  font-size: 14px;
  color: var(--color-complemetario);
  border-radius: 5px;
  border: solid 1px var(--color-t-cuarto);
  box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  background-color: transparent;
  margin-top: 5px;
}

.nombre label {
  color: var(--color-dos-secundario);
}

.descrip textarea {
  width: 300px;
  height: 100px;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid var(--color-t-cuarto);
  color: var(--color-complemetario);
  resize: vertical;
  box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  background-color: transparent;
  margin-top: 5px;
}

.descrip label {
  color: var(--color-dos-secundario);
  
}
.editInfo div {
  display: block;
 height: 60px;
 position: relative;
}

.editInfo div label {
  position: absolute;
  top: -20px;
  left: 0;
}

.preguntas {
   margin-top: 50px;
   margin-bottom: 20px;
   
    
}

.preguntas h1 {
  color: var(--color-dos-secundario);
  font-size: 18px;
}

.cajas {
  width: 100%;
  display: grid;
 grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 5px;
  height: 200px; /* Define la altura del contenedor */
  overflow: auto; /* Añade una barra de desplazamiento cuando sea necesario */
  
}

.cajas aside {
  width: 120px;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  background-color: var(--color-complemetario);
  display: flex;
  padding: 12px;
  margin-top: 20px;
 
}

.cajas aside p {
  font-size: 13px;
 font-weight: 500;
 line-height: 1;
 text-overflow: ellipsis;
}

.buts {
  width: 320px;
  margin-top: 150px;
  display: flex;
  gap: 100px;
}

.buts button {
  height: 30px;
   width: 150px;
   margin: 5px;
   border: none;
   border-radius: 4px;
   background-color: var(--color-t-cuarto);
   color: var(--color-complemetario);
   font-weight: bold;
   cursor: pointer;
}

.one {
  width: 100%;
  margin-top: 10px;
   display: flex;
   flex-direction: column;
   gap: 6px;
}

.one input {
  width: 300px;
  height: 25px;
  padding: 10px;
  font-size: 14px;
  color: var(--color-complemetario);
  border-radius: 5px;
  border: solid 1px var(--color-t-cuarto);
  box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  background-color: transparent;
}

.one span {
  display: flex;
  gap: 15px;
}

.one span button {
  border: none;
  background-color: black;
  color: var(--color-complemetario);
  border-radius: 5px;
  padding: 6px;
  font-size: 13px;
  box-shadow: 5px 8px 11px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.two {
  width: 320px;
  display: flex;
  flex-direction: column;
}

.two  div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.two div input {
  width: 300px;
  height: 16px;
  padding: 10px;
  font-size: 14px;
  color: var(--color-complemetario);
  border-radius: 5px;
  border: solid 1px var(--color-t-cuarto);
  box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  background-color: transparent;
}

.two span {
  display: flex;
  gap: 6px;
  padding-top: 115px;
}

.two span button {
  border: none;
  background-color: black;
  color: var(--color-complemetario);
  border-radius: 5px;
  padding: 6px;
  font-size: 13px;
  box-shadow: 5px 8px 11px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
}


.tree {
  width: 320px;
  display: flex;
  flex-direction: column;
}

.tree  div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tree div p {
  width: 300px;
  height: 16px;
  padding: 10px;
  font-size: 14px;
  color: var(--color-complemetario);
  border-radius: 5px;
  border: solid 1px var(--color-t-cuarto);
  box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  background-color: transparent;
}

.tree span {
  display: flex;
  gap: 6px;
  padding-top: 115px;
}

.tree span button {
  border: none;
  background-color: black;
  color: var(--color-complemetario);
  border-radius: 5px;
  padding: 6px;
  font-size: 13px;
  box-shadow: 5px 8px 11px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
}


.final {
  display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 150px;
    gap: 50px;
}

.final span {
  color: var(--color-t-secundario);
  font-size: 20px;
}

.asi {
  display: flex;
  gap: 20px;
}

.asi button {
  height: 30px;
   width: 120px;
   margin: 5px;
   border: none;
   border-radius: 4px;
   background-color: var(--color-t-cuarto);
   color: var(--color-complemetario);
   font-weight: bold;
   cursor: pointer;
}

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

  
</style>