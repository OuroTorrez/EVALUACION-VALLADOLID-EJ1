import { createStore } from 'vuex'

export default createStore({
  // Datos precargados para los clientes
  state: {
    clients: [
      { id: 1, name: 'Juan Pérez', email: 'juan@example.com', phone: '123456789' },
      { id: 2, name: 'María García', email: 'maria@example.com', phone: '987654321' }
    ],
    nextId: 3 // Contador para el próximo ID a asignar
  },
  mutations: {
    // Agregar un nuevo cliente
    ADD_CLIENT(state, client) {
      client.id = state.nextId++
      state.clients.push(client)
    },
    // Actualizar un cliente existente
    UPDATE_CLIENT(state, updatedClient) {
      const index = state.clients.findIndex(client => client.id === updatedClient.id)
      if (index !== -1) {
        state.clients.splice(index, 1, updatedClient)
      }
    },
    // Eliminar un cliente
    DELETE_CLIENT(state, clientId) {
      state.clients = state.clients.filter(client => client.id !== clientId)
    }
  },
  actions: {
    // Agregar un cliente (commit de la mutación)
    addClient({ commit }, client) {
      commit('ADD_CLIENT', client)
    },
    // Actualizar un cliente
    updateClient({ commit }, client) {
      commit('UPDATE_CLIENT', client)
    },
    // AEliminar un cliente
    deleteClient({ commit }, clientId) {
      commit('DELETE_CLIENT', clientId)
    }
  },
  getters: {
    // Getter para obtener todos los clientes
    allClients: state => state.clients,
    // Getter para obtener un cliente por su ID
    clientById: state => id => {
      return state.clients.find(client => client.id === id)
    }
  }
})
