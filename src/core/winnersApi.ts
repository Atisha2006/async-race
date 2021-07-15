import { IWinner } from '../models';

export class WinnersApi {
  private request: string;

  constructor(base: string) {
    this.request = `${base}/winners`;
  }

  async getWinners(page: number, limit = 10, sort: string, order: string): Promise<Array<IWinner>> {
    const response = await fetch(`${this.request}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const result = await response.json();
    return result;
  }

  async getWinnersCount(): Promise<string | null> {
    const response = await fetch(`${this.request}?_page=1`);
    await response.json();
    return response.headers.get('X-Total-Count');
  }

  async getWinner(id: number): Promise<IWinner | null> {
    const response = await fetch(`${this.request}/${id}`);
    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return result;
  }

  async createWinner(winner: IWinner): Promise<IWinner> {
    const response = await fetch(this.request, {
      method: 'POST',
      body: JSON.stringify(winner),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    const result = await response.json();
    return result;
  }

  async deleteWinner(id: number): Promise<IWinner> {
    const response = await fetch(`${this.request}/${id}`, { method: 'DELETE' });
    const result = await response.json();
    return result;
  }

  async updateWinner(winner: IWinner): Promise<IWinner> {
    const response = await fetch(`${this.request}/${winner.id}`, {
      method: 'PUT',
      body: JSON.stringify(winner),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    const result = await response.json();
    return result;
  }
}
