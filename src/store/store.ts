import Vue from 'vue';
import Vuex from 'vuex';
import { SystemModule } from './modules';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    system: SystemModule,
  },
});
