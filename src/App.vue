<script setup>
import {RouterView} from 'vue-router';
import {ref} from 'vue';
import Navbar from './components/Navbar.vue'
const isLoading = ref(true);

// Simulate page loading
setTimeout(() => {
  isLoading.value = false;
}, 2000);

</script>
<template>
 <div v-if="isLoading">
        <BContainer fluid>
        <BRow class="align-items-center justify-content-center vh-100 text-center">
            <BCol>
            <BSpinner></BSpinner>
          </BCol>
        </BRow>
    </BContainer>
      </div>
      <div v-else>
        <Navbar  v-if="!['login', 'logout'].includes($route.name)"/>
    
      <RouterView class="bg-white m-2" />
  
     
      </div>
</template>

<style scoped>
</style>
