import { ICar } from '../models';
import { CAR_PER_PAGE } from './constants';

export class GarageApi {
  private request: string;

  constructor(base: string) {
    this.request = `${base}/garage`;
  }

  async getCars(page: number, limit = CAR_PER_PAGE): Promise<Array<ICar>> {
    const response = await fetch(`${this.request}?_page=${page}&_limit=${limit}`);
    const result = await response.json();
    return result;
  }

  async getCarsCount(): Promise<string | null> {
    const response = await fetch(`${this.request}?_page=1`);
    await response.json();
    return response.headers.get('X-Total-Count');
  }

  async getCar(id: number): Promise<ICar> {
    const response = await fetch(`${this.request}/${id}`);
    const result = await response.json();
    return result;
  }

  async createCar(car: ICar): Promise<ICar> {
    const carRequest = { name: car.name, color: car.color };
    const response = await fetch(this.request, {
      method: 'POST',
      body: JSON.stringify(carRequest),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    const result = await response.json();
    return result;
  }

  async deleteCar(id: number): Promise<ICar> {
    const response = await fetch(`${this.request}/${id}`, { method: 'DELETE' });
    const result = await response.json();
    return result;
  }

  async updateCar(car: ICar): Promise<ICar> {
    const response = await fetch(`${this.request}/${car.id}`, {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    const result = await response.json();
    return result;
  }
}
