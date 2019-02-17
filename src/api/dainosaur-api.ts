import { User, Website } from '@/types';
import axios from 'axios';

/**
 * Dainosaur API client
 */
class DainosaurApi {
  private _apiBase: string;
  constructor(url: string) {
    this._apiBase = `${url}/api`;
  }

  /**
   * Find an existing user or create a new one. This method is used
   * for account creation when tipping a user that has not yet signed up.
   */
  public async createOrFindUserWithUsername(
    website: Website,
    username: string,
  ): Promise<{ user: User }> {
    const json = await axios.post<{ user: User }>(
      `${this._apiBase}/user/createOrFindWithUsername`,
      {
        website,
        username,
      },
    );
    return json.data;
  }

  /**
   * Find an existing user or create a new one upon successful authentication.
   */
  public async createOrFindUserWithToken(
    website: Website,
    token: string,
    secret?: string,
  ): Promise<{ user: User }> {
    const json = await axios.post<{ user: User }>(
      `${this._apiBase}/user/createOrFindWithToken`,
      {
        website,
        token,
        secret,
      },
    );
    return json.data;
  }

  /**
   * Get a users address
   */
  public async getAddress(): Promise<{ address: string }> {
    const json = await axios.get<{ address: string }>(
      `${this._apiBase}/user/address`,
    );
    return json.data;
  }

  /**
   * Get a users transaction history
   */
  public async getHistory(): Promise<{ history: [] }> {
    const json = await axios.get<{ history: [] }>(
      `${this._apiBase}/user/history`,
    );
    return json.data;
  }
}

const { VUE_APP_DAINOSAUR_API_URL } = process.env;
export const dainosaur = new DainosaurApi(VUE_APP_DAINOSAUR_API_URL);
