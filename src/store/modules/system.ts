import { User, UserTab } from '@/types';
import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ name: 'system' })
export class SystemModule extends VuexModule {
  private _activeUser: User | undefined = undefined;
  private _activeTab: UserTab = UserTab.DASHBOARD;
  private _profileMode: boolean = false;

  get activeUser() {
    return this._activeUser;
  }

  get activeTab() {
    return this._activeTab;
  }

  get profileMode() {
    return this._profileMode;
  }

  @Mutation
  setUser(activeUser: User) {
    this._activeUser = activeUser;
  }

  @Mutation
  setTab(activeTab: UserTab) {
    this._activeTab = activeTab;
  }

  @Mutation
  setProfileMode(isProfileMode: boolean) {
    this._profileMode = isProfileMode;
  }
}
