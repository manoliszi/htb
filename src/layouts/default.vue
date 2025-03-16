<template>
  <AppSideMenu />

  <v-main class="ma-5">
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script setup>
import AppSideMenu from '@/components/AppSideMenu.vue';
</script>
