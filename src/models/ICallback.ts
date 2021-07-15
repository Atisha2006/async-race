import { ICar } from './ICar';

export interface CallbackCarType {
  (car: ICar, time?: number): Promise<void>;
}

export interface CallbackType {
  (): Promise<void>;
}

export interface CallbackSortType {
  (page: number, limit: number, sort: string, order: string): Promise<void>;
}
