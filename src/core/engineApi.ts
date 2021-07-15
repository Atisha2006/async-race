import { IEngine } from '../models';

export class EngineApi {
  private request: string;

  constructor(base: string) {
    this.request = `${base}/engine`;
  }

  async setEngine(id: number, status: string): Promise<IEngine> {
    const response = await fetch(`${this.request}?id=${id}&status=${status}`);
    const result = await response.json();
    return result;
  }

  async setDrive(id: number, status: string): Promise<boolean> {
    const response = await fetch(`${this.request}?id=${id}&status=${status}`);
    if (response.status === 500) {
      return false;
    }
    if (response.status === 404 || response.status === 429) {
      return true;
    }
    const result = await response.json();
    return result.string;
  }
}
