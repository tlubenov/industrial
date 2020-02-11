import Vue from 'vue';
import axios from 'axios';

import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
