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
      user: createFakeUser(),
      chartData: {
        prices: [],
        dates: []
      },
    }
  },
  actions: {
    updateUserData(customData) {
      this.user = createFakeUser(customData);
    },
    async getBitcoinHistory(numberOfDays) {
      const url = `https://data-api.cryptocompare.com/index/cc/v1/historical/days?market=cadli&instrument=BTC-USD&limit=${numberOfDays}&aggregate=1&fill=true&apply_mapping=true&response_format=JSON&cache_bust_ts=1741437900&to_ts=1741437960`;

      try {
        const response = await api.get(url);
        const prices = response.data.Data.map(item => item.CLOSE);
        const dates = response.data.Data.map(item => {
          const date = new Date(item.TIMESTAMP * 1000);
          return date.toISOString().split('T')[0];
        });
        this.chartData.prices = prices;
        this.chartData.dates = dates;
        return {ok: true}
      } catch (error) {
        console.error("Error fetching Bitcoin data:", error);
        return {ok: false}
      }
    }
  },
  getters: {
    getUser(state) {return state.user},
    getChartData(state) {return state.chartData},
  }
})
