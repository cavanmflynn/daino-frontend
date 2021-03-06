import { getModule } from 'vuex-module-decorators';
import { SystemModule } from './modules';
import { store } from './store';

// Store Export
export { store } from './store';

// Module Exports
export const system = getModule(SystemModule, store);
