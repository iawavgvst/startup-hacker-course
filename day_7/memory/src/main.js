import { createApp } from "vue";
import App from "./App.vue";
import "./css/style.scss";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './font-awesome.js';
import router from './router';
import 'startup-ui/dist/index.css';

createApp(App)
    .component('FontAwesomeIcon', FontAwesomeIcon)
    .use(router)
    .mount("#app");
