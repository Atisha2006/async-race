import { IEngine } from '../models';
import { EngineApi } from './engineApi';

export class EngineService {
  private engineApi: EngineApi;

  constructor(api: EngineApi) {
    this.engineApi = api;
  }

  async setEngine(id: number, status: string): Promise<IEngine> {
    return this.engineApi.setEngine(id, status);
  }

  async setDrive(id: number, status: string): Promise<boolean> {
    return this.engineApi.setDrive(id, status);
  }
}
