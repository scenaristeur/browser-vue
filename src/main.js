import { createApp } from 'vue'
import App from './App.vue'
import VueIpfs from './plugins/vue-ipfs.js'
import store from './store'
import VueSimpleContextMenu from 'vue-simple-context-menu';
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css';

// Load our IPFS plugin.
const app = createApp(App)
app.component('vue-simple-context-menu', VueSimpleContextMenu);
app.use(store);
app.use(VueIpfs, {store: store})
app.mount('#app')
