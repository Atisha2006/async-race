import { ICar } from '../models';
import { GarageApi } from './garageApi';

export class GarageService {
  private garageApi: GarageApi;

  constructor(api: GarageApi) {
    this.garageApi = api;
  }

  async getCars(page: number): Promise<Array<ICar>> {
    return this.garageApi.getCars(page);
  }

  async getCarsCount(): Promise<string | null> {
    return this.garageApi.getCarsCount();
  }

  async getCar(id: number): Promise<ICar> {
    return this.garageApi.getCar(id);
  }

  async createCar(car: ICar): Promise<ICar> {
    return this.garageApi.createCar(car);
  }

  async deleteCar(id: number): Promise<ICar> {
    return this.garageApi.deleteCar(id);
  }

  async updateCar(car: ICar): Promise<ICar> {
    return this.garageApi.updateCar(car);
  }
}
