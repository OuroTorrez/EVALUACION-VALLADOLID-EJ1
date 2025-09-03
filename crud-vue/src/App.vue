<template>

  // Header
  <v-app>
    <v-app-bar color="primary">
      <router-link to="/" style="display: flex; align-items: center; max-width: 70px;">
        <v-img src="../public/IsoPNG.png" alt="Logo Caja Morelia Valladolid" width="auto" max-height="50"></v-img>
      </router-link>
      <v-toolbar-title>Caja Morelia Valladolid</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>
