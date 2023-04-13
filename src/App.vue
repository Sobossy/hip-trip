<template>
  <div class="app">
    <!-- <keep-alive includes="home">
      <RouterView/>
    </keep-alive> -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component" />
      </keep-alive>
    </router-view>
    <tab-bar v-show="!route.meta.hideTabBar"/>
    <loading/>
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tab-bar.vue';
import { useRoute } from 'vue-router';
import loading from '@/components/loading/loading.vue';


const route = useRoute()
</script>

<style scoped>


</style>