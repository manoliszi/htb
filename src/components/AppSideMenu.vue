<template>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item title="My App"></v-list-item>

        <v-divider></v-divider>

        <v-list-item 
          v-for="item in menuItems" 
          :key="item.title" 
          :to="item.route"
          :prepend-icon="item.icon"
          color="primary"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="secondary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My Application</v-toolbar-title>
    </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);

const menuItems = [
  { title: "Home", route: "/", icon: "mdi-home" },
  { title: "About", route: "/about", icon: "mdi-information" },
  { title: "Contact", route: "/contact", icon: "mdi-email" }
];
</script>