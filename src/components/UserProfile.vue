<template>
  <v-container class="d-flex justify-center">
    <v-card
      class="elevation-4 pa-4"
      width="400"
    >
      <v-avatar
        size="100"
        class="mx-auto d-block profile-avatar"
      >
        <v-img
          :src="user.avatar"
          alt="User Avatar"
        />
      </v-avatar>

      <v-card-title class="text-center text-h5 mt-3 profile-name">
        {{ user.name }}
      </v-card-title>
      <v-card-subtitle class="text-center profile-email">
        {{ user.email }}
      </v-card-subtitle>

      <v-divider class="my-3" />

      <v-list>
        <div class="list-items">
          <v-icon>mdi-phone</v-icon>
          <v-list-item-title class="item-value profile-phone">
            {{ user.phone }}
          </v-list-item-title>
        </div>

        <div class="list-items">
          <v-icon>mdi-home</v-icon>
          <v-list-item-title class="item-value profile-address">
            {{ user.address }}
          </v-list-item-title>
        </div>

        <div class="list-items">
          <v-icon>mdi-calendar</v-icon>
          <v-list-item-title class="item-value profile-createdAt">
            Joined: {{ formatDate(user.createdAt) }}
          </v-list-item-title>
        </div>

        <div class="list-items">
          <v-icon>mdi-identifier</v-icon>
          <v-list-item-title class="item-value profile-id">
            ID: {{ user.id }}
          </v-list-item-title>
        </div>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
import { useMainStore } from '../stores/index'
import { computed } from 'vue';

const store = useMainStore()

const user = computed(() => store.getUser);
function formatDate(date) {
  return new Date(date).toLocaleString();
}
</script>

<style>
.list-items {
  display: flex !important;
  margin-top: 20px;
}
.item-value {
  margin-left: 10px;
}
</style>
