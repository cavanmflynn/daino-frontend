import { Website } from '@/types';
import axios from 'axios';
import { database } from 'firebase';

/**
 * Firebase API client
 */
class FirebaseApi {
  private _database: database.Database;
  constructor() {
    this._database = database();
  }

  /**
   * Get a users balance
   */
  public async getBalance(website: Website, userId: string): Promise<number> {
    const snapshot = await this._database
      .ref(`websites/${website}/users/${userId}`)
      .once('value');
    return snapshot.val().balance;
  }

  /**
   * Get a users address
   */
  public async getAddress(userId: string): Promise<{ address: string }> {
    const snapshot = await this._database
      .ref(`/users/${userId}/address`)
      .once('value');
    return snapshot.val();
  }

  /**
   * Get a users transaction history
   */
  public async getHistory(userId: string): Promise<{ history: [] }> {
    const snapshot = await this._database
      .ref(`/users/${userId}/history`)
      .once('value');
    return snapshot.val();
  }
}

export const firebaseApi = new FirebaseApi();
