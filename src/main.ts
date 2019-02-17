import firebase from 'firebase';
import Clipboard from 'v-clipboard';
import Vue from 'vue';
import App from './components/app';
import './filters';
import router from './router';
import { store } from './store';

Vue.config.productionTip = false;

Vue.use(Clipboard);

// Firebase config
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSEGING_SENDER_ID,
};

let app: Vue;
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
