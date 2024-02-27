<script setup>
import Nav from './components/Nav.vue';
</script>

<template>
    <div class="rut">
        <router-view />
    </div>
</template>

<!-- <script setup>
import {onMounted, computed} from 'vue'
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

const router = useRouter();

const store = useStore()
 onMounted(() => {
    const user = computed(() => store.state.user)
  if(user === '') {
   return router.push('/')
  }
 })
</script> -->

<style scoped>

.rut{
    text-decoration: none;

}

</style>


