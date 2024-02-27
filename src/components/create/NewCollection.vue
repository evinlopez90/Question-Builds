<template>
  <div v-if="loader === false">
    <div class="final" v-if="instan === 4">
         <span> {{ creado }}</span>
         <aside class="asi">
          <button><router-link to="/secciones" >Ver secciones</router-link></button>
         <button @click="newSeccion" >Nueva seccion</button>
         <button @click="instanc(1)" v-if="creado === 'Error al crear la sección'">Intentarlo de nuevo</button>
         <button @click="regresar" v-if="creado === 'Error al crear la sección'">Salir</button>
         </aside>
      </div>

  <div class="div" v-if="instan < 4">
    <div class="inf">
      <div class="regresar" >
        <v-icon  @click="regresar" style="cursor: pointer; position: absolute; left: 50px; color: var(--color-complemetario);" name="md-keyboardbackspace-round" />
      </div>
      <h1>Crear Cuestion</h1>
      <p>Crea tus preguntas aqui</p>
      <div class="go" v-if="instan  == 0">
        <h3>¿Estas Listo?</h3>
        <button @click="instanc(1)" class="btn btn-primay">¡Vamos...!</button>
      </div>
      <div class="alerta" v-if="alerta.length > 0" >
         <span>  <v-icon name="oi-alert" style="color: darkred;"  /> {{ alerta }}</span>
      </div>
    </div>
    <div class="question">
      <div class="barra-op" v-if="instan >= 1">
        <v-icon v-on:click="instanc(--instan)" style="cursor: pointer;" name="md-keyboardbackspace-round" />
        <span  v-on:click="instanc(0)">Cancelar</span>
      </div>
      <div class="create">

        <div class="pre-res" v-if="instan === 2">
          <aside class="inp">
            <label for="">Escribe tu ingeniosa pregunta</label>
            <input type="text" v-model="pregts.pregunta" name="pregunta" placeholder="Aqui tu pregunta">
          </aside>
          <div class="respuest">
           <label for="">Escribe las posibles respuestas</label>
            <aside class="from" v-for="item in opciones" :key="item.opcion"  >
    <div class="pre">
      
      <input  type="text"  v-model="item.repuesta" :placeholder="item.opcion">
    </div>
  </aside>
          </div>
        </div>

        <div class="corect" v-if="instan === 3">
          <p>Elige la respuesta que crees que es la correcta</p>
          <div class="div-span">
            <span
      v-for="item in pregts.respuestas"
      :key="item"
      @click="cambiarVeredicto(item)"
    >
      {{ item }} <v-icon  v-if="pregts.respuestaCorrecta === item" name="io-checkmark-done-circle-sharp" />  </span>
          </div>
      <aside class="but">
          <button @click="handleInput" v-if="instan === 3">Crear sección</button>
          <button class="add-pregunt" @click="handleInput('agregar otra')" v-if="instan === 3 &&  estado.preguntas.length > 0  && estado.preguntas.length > 0" >Añadir pregunta</button>
        </aside>
        </div>


      </div>

      <div class="ins-1" v-if="instan===1">
        <aside class="nom">
          <div>
            <label for="">Nombre</label>
            <input v-model="estado.nombre" type="text" placeholder="Dale un nombre a tu sección">
          </div>
          <div>
            <label for="">Descripción</label>
            <textarea v-model="estado.descripcion" placeholder="Describe tu sección"></textarea>
          </div>
        </aside>
      </div>

      <div class="buts">
        <button class="butSi" @click="instanc(instan + 1)" v-if="instan === 1">Iniciar</button>
        <button class="butSi" @click="modifiOpciones(3)" v-if="instan === 2">Siguiente</button>
      </div>
      
    </div>
  </div>
  </div>
  <div v-else class="loadig">
    <div  class="loader">
  
</div>
  </div>
</template>



<script setup>
import { ref, onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';
import axiosClient from '../../../axiosClient';
const router = useRouter();
const instan = ref(0);
import { useStore } from 'vuex';
const store = useStore();
const loader = ref(true)
const alerta = ref('')

const creado = ref('')

const instanc = (valor) => {
 
    instan.value = valor
    alerta.value = ''
}

const user = computed(() => store.state.user)
  

function regresar () {
  router.go(-1)
}


const opciones = ref([
  {opcion: "Opcion 1", repuesta:undefined  },
  {opcion: "Opcion 2", repuesta:undefined  },
  {opcion: "Opcion 3", repuesta:undefined },
  {opcion: "Opcion 4", repuesta: undefined }
])

const pregts = ref(
  {
  pregunta: '',
  respuestaCorrecta: '',
  respuestas: []
}
)

function modifiOpciones (valor) {
  alerta.value = ''
  for (let i = 0; i < opciones.value.length; i++) {
    const elemento = opciones.value[i];
    if(pregts.value.respuestas.length < 4) {
     elemento.repuesta !== undefined && elemento.repuesta !== "" ?   pregts.value.respuestas.push(elemento.repuesta) :  pregts.value.respuestas = []
    } 
  }
  if(pregts.value.respuestas.length > 3 && pregts.value.pregunta.length > 0) {
    instan.value = valor
   
  } else {
    alerta.value = 'Llena todos los campos'
  }
  
}




const cambiarVeredicto = (res) => {
  pregts.value.respuestaCorrecta = res 
}

const estado = ref({
      nombre: '',
      descripcion: '',
      preguntas: [
        
      ],
      user: user.value
    })

  const newSeccion = (input) => {
    opciones.value = [
  {opcion: 'Opcion 1', repuesta: undefined },
  {opcion: 'Opcion 2', repuesta: undefined },
  {opcion: 'Opcion 2', repuesta: undefined },
  {opcion: 'Opcion 4', repuesta: undefined }
]

estado.value = {
      nombre: '',
      descripcion: '',
      preguntas: [
        
      ],
      user: user.value
    }

   

pregts.value = {
  pregunta: '',
  respuestaCorrecta: '',
  respuestas: []
}

input === 'desdecreate' ? null : instan.value = 1
 
  }
const handleInput = async (valor) => {
  alerta.value = ""
 if(estado.value.nombre === "" || estado.value.descripcion === "") {
  instan.value = 1
  alerta.value = 'Completa todos los campos'
  return
 }



 
 if(pregts.value.respuestaCorrecta.length < 1)  {
  instan.value = 3
  alerta.value = 'Debes eligir una respuesta correcta'
  return
 }

 estado.value.preguntas.push(pregts.value)

 if(estado.value.preguntas.length < 1) {
  instan.value = 2
  alerta.value = 'No puedes crear una seccion sin preguntas'
  return
 }

 if(estado.value.preguntas.length < 2) {

 opciones.value = [
  {opcion: 'Opcion 1', repuesta: undefined },
  {opcion: 'Opcion 2', repuesta: undefined },
  {opcion: 'Opcion 3', repuesta: undefined },
  {opcion: 'Opcion 4', repuesta: undefined }
]

pregts.value = {
  pregunta: '',
  respuestaCorrecta: '',
  respuestas: []
}


  instan.value = 2
  alerta.value = "Cada seccion debe de tener 2  o mas preguntas. CREA OTRA"
  return
 }

 if(valor === 'agregar otra') {
  opciones.value = [
  {opcion: 'Opcion 1', repuesta: undefined },
  {opcion: 'Opcion 2', repuesta: undefined },
  {opcion: 'Opcion 3', repuesta: undefined },
  {opcion: 'Opcion 4', repuesta: undefined }
]

pregts.value = {
  pregunta: '',
  respuestaCorrecta: '',
  respuestas: []
}


  instan.value = 2
  return
 }

 
 
 try {
  const result = await axiosClient.post(`secciones`, estado.value) 
 const data = result.data

 if(data.message = "¡Sección creada exitosamente!") {

    creado.value = data.message
    instan.value = 4
    newSeccion('desdecreate');
 }
 } catch (error) {
  creado.value = error.response.data.error

  instan.value = 4
   
 }


}


onMounted(() => {
  
   
  setTimeout(() => {
    loader.value = false
  }, 2000)
})



</script>


<style scoped>
.div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 50px;
    gap: 120px;
}

.question {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.question label {
  color: var(--color-complemetario);
}

.create {
  width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 53px;
}

.pre-res {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}



.inp {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.inp input {
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

.inp label {
  color: var(--color-complemetario);
}

.barra-op {
    width: 370px;
    display: flex;
  justify-content: space-between;
  
}

.barra-op span {
    font-size: 14px;
    color: red;
    cursor: pointer;
}

.regresar {
  position: relative;
  width: 100%;
}



.inf {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.inf h1 {
  color: var(--color-complemetario);
  font-size: 50px;
}

.inf p {
  color: var(--color-dos-secundario);
}
.go {
 margin-top: 50px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-t-cuarto);
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}



.btn:hover {
  background-color: #3e8e41;
}

.go h3 {
  color: var(--color-complemetario);
}
.from {
    width: 100%;
    display: flex; 
    justify-content: space-between;
    margin-top: -10px;
}




.respuest {
    width: 370px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.from label {
    font-size: 13px;
    margin-top: 7px;
}

.from input {
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




.from input:focus {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.butSi {
    height: 28px;
   width: 120px;
   margin: 5px;
   border: none;
   border-radius: 4px;
   background-color: var( --color-t-cuarto);
   color: var(--color-complemetario);
   font-weight: bold;
   cursor: pointer;
}

.nom {
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 310px;
gap: 20px;
}

.nom textarea {
  
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
}

.nom textarea:focus {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.nom input {
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

.nom input:focus {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}


.nom label {
  font-size: 15px;
  color: var(--color-complemetario);
  font-weight: bolder;
}

.corect {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    gap: 15px;
    margin-right: 50px;
}

.corect p {
    font-size: 14px;
    color: var(--color-complemetario);
}


.div-span {
  display: flex;
  flex-direction: column;
  gap: 12px;

}

.corect span {
    width: 320px;
    background-color: transparent;
    border: solid 1px var(--color-t-cuarto);
    color: var(--color-complemetario);
    padding: 6px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
}


.but button {
   height: 30px;
   width: 120px;
   margin: 5px;
   border: none;
   border-radius: 4px;
   background-color: var(--color-t-secundario);
   color: var(--color-complemetario);
   font-weight: bold;
   cursor: pointer;
}

.ins-1 {
  width: 100%;
  display: flex;
  justify-content: center;
}


.pre {
  display: flex;

}

.alerta {
  position: fixed; 
  display: flex;
  z-index: 100;
  align-items: center;
  padding: 5px;
  width: 28%;
  height: 40px;
  box-shadow: 1px 1px 4px #000;
  margin-top: 200px;
  font-size: 12px;
}

.alerta  span {
  color: var(--color-complemetario);
}

.buts {
  width: 100%;
  display: flex;
  justify-content: center;
  
}

.add-pregunt {
   background-color: var(--color-t-cuarto);
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

@media (max-width: 387px) {
   .inf h1 {
    font-size: 30px;
   }
   
}

@media (max-width:520px) {
  .regresar {
    display: flex;
   margin-bottom: 30px;
   
  }
}

</style>