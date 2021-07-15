import { CAR_PER_PAGE, States, WINNER_PER_PAGE } from './constants';

export class Context {
  private static instance: Context;

  private activeState: string;

  private carsCount: number;

  private carsPage: number;

  private winnersCount: number;

  private winnersPage: number;

  private constructor() {
    this.activeState = States.garage;
    this.carsCount = 0;
    this.carsPage = 1;
    this.winnersCount = 0;
    this.winnersPage = 1;
  }

  public static getInstance(): Context {
    if (!Context.instance) {
      Context.instance = new Context();
    }
    return Context.instance;
  }

  public setActiveState(value: string): void {
    this.activeState = value;
  }

  public getActiveState(): string {
    return this.activeState;
  }

  public getCarsPageAll(): number {
    return Math.ceil(this.carsCount / CAR_PER_PAGE);
  }

  public setCarsCount(value: number): void {
    this.carsCount = value;
  }

  public getCarsCount(): number {
    return this.carsCount;
  }

  public setCarsPage(value: boolean): void {
    if (value) this.carsPage++;
    else this.carsPage--;
  }

  public getCarsPage(): number {
    return this.carsPage;
  }

  public getWinnersPageAll(): number {
    return Math.ceil(this.winnersCount / WINNER_PER_PAGE);
  }

  public setWinnersCount(value: number): void {
    this.winnersCount = value;
  }

  public getWinnersCount(): number {
    return this.winnersCount;
  }

  public setWinnersPage(value: boolean): void {
    if (value) this.winnersPage++;
    else this.winnersPage--;
  }

  public getWinnersPage(): number {
    return this.winnersPage;
  }
}
