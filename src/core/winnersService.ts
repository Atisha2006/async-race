import { IWinner } from '../models';
import { WinnersApi } from './winnersApi';

export class WinnersService {
  private winnersApi: WinnersApi;

  constructor(api: WinnersApi) {
    this.winnersApi = api;
  }

  async getWinners(page: number, limit = 10, sort: string, order: string): Promise<Array<IWinner>> {
    return this.winnersApi.getWinners(page, limit, sort, order);
  }

  async getWinnersCount(): Promise<string | null> {
    return this.winnersApi.getWinnersCount();
  }

  async getWinner(id: number): Promise<IWinner | null> {
    return this.winnersApi.getWinner(id);
  }

  async createWinner(id: number, time: number, wins = 1): Promise<IWinner> {
    const winner = {
      id,
      wins,
      time
    };
    return this.winnersApi.createWinner(winner);
  }

  async deleteWinner(id: number): Promise<IWinner> {
    return this.winnersApi.deleteWinner(id);
  }

  async updateWinner(id: number, wins: number, time: number): Promise<IWinner> {
    const winner = {
      id,
      wins,
      time
    };
    return this.winnersApi.updateWinner(winner);
  }
}
