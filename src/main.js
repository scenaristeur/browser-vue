import { createApp } from 'vue'
import App from './App.vue'
import VueIpfs from './plugins/vue-ipfs.js'
import store from './store'

// Load our IPFS plugin.
const app = createApp(App)
app.use(store);
app.use(VueIpfs, {store: store})
app.mount('#app')
