/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import vuetify from '@/plugins/vuetify'
import pinia from '@/plugins/pinia.js'
import router from '@/router'
import App from './App.vue'
import {createApp, markRaw} from 'vue'
import { useMainStore } from './stores/index.js'

const app = createApp(App)

pinia.use(({ store }) => {
  store.$router = markRaw(router);
  store.$vuetify = markRaw(vuetify);
});

const store = useMainStore(pinia)
window.$store = store;
app.config.globalProperties.$store = store

app.use(pinia);
app.use(vuetify);
app.use(router);

app.mount("#app");

export default app;
