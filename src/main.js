import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { LaClipboardListSolid, MdViewmoduleSharp, BiPlusLg, CoMediaPlay,LaEdit, MdDeleteoutlineSharp,
  OiAlert, RiQuestionFill, MdKeyboardbackspaceRound,
   IoCheckmarkDoneCircleSharp  } from 'oh-vue-icons/icons';
import General from '../src/components/Gneral/General.vue';
import Coleciones from '../src/components/Coleciones.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import NewCollection from '../src/components/create/NewCollection.vue'
import Bienvenida from "../src/components/Bienvenida.vue";
import VistaCollec from "../src/components/VistaCollec.vue"
import stora from './stora';
import Precentacion from './components/Precentacion.vue'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
addIcons(LaClipboardListSolid,CoMediaPlay, LaEdit, MdDeleteoutlineSharp,
  MdViewmoduleSharp, OiAlert, BiPlusLg, RiQuestionFill, 
  MdKeyboardbackspaceRound, IoCheckmarkDoneCircleSharp  );

const routes = [
{
  path: '/',
  component: Bienvenida
},
  {
    path: '/presentar',
    component: General,
  },
  {
    path: '/secciones',
    component: Coleciones
  }, 
  {
    path: '/crear',
    component: NewCollection
  },
  
    {
      path: '/view/:id',
      component: VistaCollec,
      props: true,
    },
    {
      path: '/presentacion/:id',
      component: Precentacion,
      props: true,
    },
  
];

const firebaseConfig = {
  apiKey: "AIzaSyBHrcgUVPh6Kn0neCd0G0otPh4ycVh6Gso",
  authDomain: "appquestion-28840.firebaseapp.com",
  projectId: "appquestion-28840",
  storageBucket: "appquestion-28840.appspot.com",
  messagingSenderId: "667258075823",
  appId: "1:667258075823:web:93c287943d4a6360afb25a"
};



const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);
app.component('v-icon', OhVueIcon);
const  fireApp =  initializeApp(firebaseConfig);
export const auth = getAuth(fireApp)

// Add the `use` call before the `mount` call.
app.use(router).use(stora).mount("#app");

