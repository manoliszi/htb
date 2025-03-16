// Utilities
import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker';
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost', timeout: 60000,
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
});

function createFakeUser(customData = {}) {
  return {
    id: customData.id || faker.string.uuid(),
    name: customData.name || faker.person.fullName(),
    email: customData.email || faker.internet.email(),
    phone: customData.phone || faker.phone.number(),
    address: customData.address || faker.location.streetAddress(),
    avatar: customData.avatar || faker.image.avatar(),
    createdAt: customData.createdAt || new Date().toISOString()
  };
}

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      user: createFakeUser()
    }
  },
  actions: {
    updateUserData(customData) {
      this.user = createFakeUser(customData);
    }
  },
  getters: {
    getUser(state) {return state.user}
  }
})
