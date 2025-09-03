<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <h1 class="text-h4 mb-6">{{ formTitle }}</h1>

        <v-form @submit.prevent="submitForm" ref="form">
          <v-text-field
            v-model="client.name"
            label="Nombre"
            :rules="nameRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="client.email"
            label="Correo Electrónico"
            type="email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="client.phone"
            label="Teléfono"
            :rules="phoneRules"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" class="mt-4 mr-4">Guardar</v-btn>
          <v-btn color="grey" :to="'/'" class="mt-4">Cancelar</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const form = ref(null)

// Determinar si estamos editando o creando un nuevo cliente
const isEditing = computed(() => route.name === 'EditClient')

// Título del formulario según el modo
const formTitle = computed(() => isEditing.value ? 'Editar Cliente' : 'Nuevo Cliente')

// Datos del cliente
const client = ref({
  id: null,
  name: '',
  email: '',
  phone: ''
})

// Reglas de validación
const nameRules = [
  value => !!value || 'El nombre es requerido',
  value => (value && value.length >= 10) || 'El nombre debe tener al menos 10 caracteres'
]

const emailRules = [
  value => !!value || 'El correo electrónico es requerido',
  value => /.+@.+\..+/.test(value) || 'El correo electrónico debe ser válido'
]

const phoneRules = [
  value => !!value || 'El teléfono es requerido',
  value => /^[0-9]+$/.test(value) || 'Solo se permiten números',
  value => (value && value.length >= 7 && value.length <=12) || 'El teléfono debe tener de 7 a 12 dígitos'
]

// Cargar datos del cliente si estamos en modo edición
onMounted(() => {
  if (isEditing.value) {
    const clientId = parseInt(route.params.id)
    const existingClient = store.getters.clientById(clientId)

    if (existingClient) {
      client.value = { ...existingClient }
    } else {
      router.push('/')
    }
  }
})

// Enviar el formulario
async function submitForm() {
  const { valid } = await form.value.validate()

  if (valid) {
    if (isEditing.value) {
      store.dispatch('updateClient', client.value)
    } else {
      store.dispatch('addClient', client.value)
    }

    router.push('/')
  }
}
</script>
