<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6 font-weight-black">Lista de Clientes</h1>

        <v-btn :to="`/add`" color="primary" elevation="4">
          Añadir cliente &nbsp; <v-icon>mdi-account-plus</v-icon>
        </v-btn>

        <v-alert v-if="clients.length === 0" type="error" class="mt-4">
          No hay clientes registrados.
          <br>
        </v-alert>

        <v-table v-else>
          <thead>
          <tr>
            <th class="font-weight-black">Nombre</th>
            <th class="font-weight-black">Correo Electrónico</th>
            <th class="font-weight-black">Teléfono</th>
            <th class="font-weight-black">Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>
              <v-btn icon :to="`/edit/${client.id}`" color="primary" size="small" class="mr-4">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="confirmDelete(client)" color="error" size="small">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <!-- Diálogo de confirmación para eliminar -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Confirmar eliminación</v-card-title>
        <v-card-text>
          ¿Estás seguro de que deseas eliminar al cliente "{{ clientToDelete?.name }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" variant="text" @click="deleteClient">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Obtener la lista de clientes desde el store
const clients = computed(() => store.getters.allClients)

// Variables para el diálogo de confirmación de eliminación
const deleteDialog = ref(false)
const clientToDelete = ref(null)

// Función para confirmar la eliminación de un cliente
function confirmDelete(client) {
  clientToDelete.value = client
  deleteDialog.value = true
}

// Función para eliminar un cliente
function deleteClient() {
  store.dispatch('deleteClient', clientToDelete.value.id)
  deleteDialog.value = false
  clientToDelete.value = null
}
</script>
