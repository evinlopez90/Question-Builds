<template>
  <div class="contenedor" v-if="loader === false">
    <div class="regresar" >
        <v-icon  @click="regresar" style="cursor: pointer; position: absolute; left: 50px; color: var(--color-complemetario); margin-top: 30px;" name="md-keyboardbackspace-round" />
      </div>
    <aside class="encabezado">
      <h1>{{ defaultSeccion.nombre }}</h1>
      <p>{{ defaultSeccion.descripcion }}</p>
    </aside>
    <aside class="precentacion">
      <h3>{{ prentacion.pregunta }}</h3>

      <div class="present">
        <span :class="elemento === item  ? 'active' : null"
          v-for="(item, index) in prentacion.respuestas"
          :key="index"
          @click="veredicto(item)"
        >
        ({{ abc[index] }}):
          {{ item }}      </span>
      </div>
      <span class="resp" v-if="opcions.loadig === false || opcions.loadig === true"> 
         <p class="preanb">La respuesta es</p> 
        <div v-if="opcions.loadig === false" class="loader"></div>
        <p :class="clase" v-if="opcions.loadig === true">{{ veredic }}</p>
      </span>
      <div class="buttons" v-if="opcions.button === true">
        <button v-if="intance > 0" @click="nextPregunta('atras')">Atras</button>
        <button v-if="intance < longitud" @click="nextPregunta('siguiente')">Siguiente</button>
        <button v-else @click="regresar">Finalizar</button>
      </div>
    </aside>
  </div>
  <div v-else class="loadig">
    <div  class="loade">
  
</div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axiosClient from "../../axiosClient";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const stora = useStore();
const route = useRoute();
import { useRouter } from 'vue-router';
const router = useRouter();
const loader = ref(true)
const defaultSeccion = ref({});
const arrayDefault = ref([]);
const prentacion = ref({});
const intance = ref(0);
const veredic = ref("");
const opcions = ref({
  button: false,
  loadig: null,
});
const elemento = ref('');
const longitud = ref(0);

function regresar () {
  router.go(-1)
}

const clase = ref('')

const abc = ref(['a', 'b', 'c', 'd']);
const nextPregunta = (value) => {
     veredic.value = ""
  opcions.value = {
  button: false,
  loadig: false,
}
  if (value === "atras") {
    opcions.value.loadig = null
    opcions.value.button =  false
    intance.value = intance.value - 1;
    if (defaultSeccion.value.preguntas.length > intance.value) {
      prentacion.value = defaultSeccion.value.preguntas[intance.value];
      console.log(prentacion.value);
    }
  }

  if (value === "siguiente") {
    console.log(longitud.value, intance.value);
    opcions.value.loadig = null
    opcions.value.button =  false
    intance.value = intance.value + 1;
    if (defaultSeccion.value.preguntas.length > intance.value) {
      prentacion.value = defaultSeccion.value.preguntas[intance.value];
      console.log(prentacion.value);
    }
  }
};

function veredicto(item) {
  opcions.value.loadig = false;
  opcions.value.button = false;
  elemento.value = item
  if (arrayDefault.value[intance.value].respuestaCorrecta === item) {
    
    setTimeout(function () {
      // Esta función se ejecutará después de 3 segundos
      opcions.value.loadig = true;
      clase.value = 'verde'
      veredic.value = "Corecta";
      opcions.value.button = true;
    }, 3000);
  } else {
    setTimeout(() => {
      opcions.value.loadig = true;
      clase.value = 'rojo'
    veredic.value = "Incorecta";
    opcions.value.button = true;
    }, 3000)
  }
}

onMounted(async () => {
  const user = computed(() => stora.state.user)
  if(user.value === '') {
   return router.push('/')
  }
  setTimeout( async () => {
    try {
    const result = await axiosClient.get(`getSecciones/${route.params.id}`);
    
    stora.commit("getSeccion", result.data);
    prentacion.value = result.data.preguntas[0];
    defaultSeccion.value = result.data;
    arrayDefault.value = result.data.preguntas;
    longitud.value = defaultSeccion.value.preguntas.length - 1
  } catch (error) {
    console.log(error);
  }
  loader.value = false
  },2000)
});
</script>

<style scoped>
.contenedor {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
}

.encabezado {
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 40px;
}

.encabezado h1 {
  color: var(--color-complemetario);
  font-size: 32px;
}

.encabezado p {
  color: var(--color-dos-secundario);
  font-size: 17px;
}

.precentacion {
  width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 50px;
}

.precentacion h3 {
  color: var(--color-complemetario);
}

.present {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
}

.present span {
  border: solid 1px black;
  padding: 4px;
  cursor: pointer;
  color: var( --color-complemetario);
}

.active {
 background-color: var( --color-t-terciario) ;
}

/* HTML: <div class="loader"></div> */
.loader {
  display: inline-flex;
  gap: 5px;
  animation: l1-0 1s infinite;
  margin-left: 10px;
}
.loader:before,
.loader:after {
  content: "";
  width: 25px;
  aspect-ratio: 1;
  box-shadow: 0 0 0 3px inset #fff;
  transform-origin:top right;
  animation: l1-1 1s infinite;
}
.loader:after {
  transform-origin:top left;
  --s:-1;
}
@keyframes l1-0 {
  to {transform:translateY(100%)}
}
@keyframes l1-1 {
  to {transform:rotate(calc(var(--s,1)*90deg))}
}

.resp {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.rojo {
  color: var( --color-complemetario);
  background-color: var(--color-t-cuarto);
  font-size: 15px;
  padding: 3px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

.verde {
  color: var(--color-complemetario);
  background-color: var(--color-t-secundario);
  font-size: 15px;
  padding: 3px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

.preanb {
  color: var(--color-complemetario);
  font-size: 17px;
  padding: 3px;
  height: auto;
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 15px;
}

.buttons button {
  background-color: var(--color-dos-secundario); /* Green */
  border: none;
  color: var(--color-t-primario);
   width: 8%;
  padding: 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.regresar {
  position: relative;
  width: 100%;
 
}

.loadig {
  display: flex;
  justify-content: center;
  padding-top: 280px;
  
}
.loade {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side, var( --color-t-cuarto) 95%,#0000) 50% 1px/12px 12px no-repeat,
    radial-gradient(farthest-side,#0000 calc(100% - 14px), var(--color-complemetario) 0);
  animation: l9 2s infinite linear;
}
@keyframes l9 {to{transform: rotate(1turn)}}

@media (max-width: 900px) {
  .buttons button {
    width: 100px;
  }
}
</style>
