import {
  CAR_PER_PAGE,
  Context,
  EngineService,
  GarageService,
  Order,
  Sort,
  Status,
  WinnersService,
  WINNER_PER_PAGE
} from '../../core';
import { ICar, IEngine, IWinner } from '../../models';
import { generateRandomColor, generateRandomName } from '../../shared';
import { CarsList } from '../carsList';
import { GarageModule, WinnersModule } from '../contentModules';
import { GaragePanel } from '../garagePanel';
import { GarageHeader, WinnersHeader } from '../pageHeader';
import { GaragePagination, WinnersPagination } from '../pagination';
import { WinnersHeaderList, WinnersList } from '../winnersList';

export class Controller {
  private context: Context;

  private engineService: EngineService;

  private garageService: GarageService;

  private winnersService: WinnersService;

  private garagePanel: GaragePanel;

  private garageHeader: GarageHeader;

  private carsList: CarsList;

  private garagePagination: GaragePagination;

  private winnersHeader: WinnersHeader;

  private winnersHeaderList: WinnersHeaderList;

  private winnersList: WinnersList;

  private winnersPagination: WinnersPagination;

  private activeCarCount: number;

  constructor(
    garageModule: GarageModule,
    winnersModule: WinnersModule,
    garageService: GarageService,
    engineService: EngineService,
    winnersService: WinnersService
  ) {
    this.context = Context.getInstance();
    const [garagePanel, garageHeader, carsList, garagePagination] = garageModule.getContext();
    this.garageService = garageService;
    this.engineService = engineService;
    this.winnersService = winnersService;
    this.garagePanel = garagePanel;
    this.garagePanel.addListeners(
      this.createCar,
      this.updateCar.bind(this),
      this.generateCars.bind(this),
      this.raceAll.bind(this),
      this.resetAll.bind(this)
    );
    this.garageHeader = garageHeader;
    this.carsList = carsList;
    this.carsList.addCallbacks(
      this.selectCar.bind(this),
      this.removeCar.bind(this),
      this.raceCar.bind(this),
      this.resetCar.bind(this),
      this.getWinner.bind(this)
    );
    this.garagePagination = garagePagination;
    this.garagePagination.addListeners(this.updateGarage.bind(this));
    const [winnersHeader, winnersHeaderList, winnersList, winnersPagination] = winnersModule.getContext();
    this.winnersHeader = winnersHeader;
    this.winnersHeaderList = winnersHeaderList;
    this.winnersHeaderList.addListeners(this.updateWinners.bind(this));
    this.winnersList = winnersList;
    this.winnersPagination = winnersPagination;
    this.winnersPagination.addListeners(this.updateWinners.bind(this));

    this.activeCarCount = 0;

    this.initGarage();
    this.initWinners();
  }

  /**
   * Garage methods
   */

  async initGarage(): Promise<void> {
    await this.getCountCars();
    await this.updateGarage();
  }

  async getCountCars(): Promise<void> {
    const response: string | null = await this.garageService.getCarsCount();
    if (response) this.context.setCarsCount(+response);
  }

  async updateGarage(page = this.context.getCarsPage()): Promise<void> {
    this.garagePanel.updateBtnDisable(true);
    this.garagePanel.raceBtnDisable(false);
    this.garagePanel.resetBtnDisable(true);
    this.activeCarCount = 0;
    this.carsList.element.innerHTML = ``;
    await this.getCountCars();
    await this.getCars(page);
    this.garageHeader.updateContent(this.context.getCarsCount(), page);
    this.garagePagination.paginationBtnDisable();
  }

  async getCars(page: number): Promise<void> {
    const response: Array<ICar> = await this.garageService.getCars(page);
    response.forEach((car: ICar) => {
      this.carsList.addCarField(car);
    });
  }

  createCar = async (car: ICar): Promise<void> => {
    const response: ICar = await this.garageService.createCar(car);
    if (this.context.getCarsPage() === this.context.getCarsPageAll()) {
      this.carsList.addCarField(response);
    }
    this.updateGarage();
  }

  async updateCar(car: ICar): Promise<void> {
    this.garagePanel.updateBtnDisable(true);
    const response: ICar = await this.garageService.updateCar(car);
    this.carsList.updateCarField(response);
    await this.updateWinners();
  }

  async generateCars(): Promise<void> {
    this.garagePanel.generateBtnDisable(true);
    let cars: Array<ICar> = [];
    for (let i = 0; i < 100; i++) {
      cars = [...cars, { name: generateRandomName(), color: generateRandomColor(), id: -1 }];
    }
    await Promise.all(cars.map(async (car) => this.garageService.createCar(car)));
    if (this.context.getCarsPage() === this.context.getCarsPageAll()) {
      const count = CAR_PER_PAGE - (this.context.getCarsCount() % CAR_PER_PAGE);
      for (let i = 0; i < count; i++) {
        this.carsList.addCarField(cars[i]);
      }
    }
    this.updateGarage();
    this.garagePanel.generateBtnDisable(false);
  }

  updateRaceBtnDisable(val: boolean): void {
    this.garagePanel.raceBtnDisable(val);
    this.carsList.raceBtnDisable(val);
  }

  async raceAll(): Promise<void> {
    this.updateRaceBtnDisable(true);
    this.garagePagination.paginationAllDisable(true);
    let responses: number[] = [];
    let responsesCar: Array<ICar> = [];
    let counter = 3;
    const countEl: HTMLElement = document.createElement('div');
    countEl.classList.add('race-count');
    countEl.innerHTML = `${counter}`;
    this.carsList.element.append(countEl);
    const timerId = setInterval(() => {
      counter--;
      countEl.innerHTML = `${counter}`;
      if (counter === 0) {
        this.carsList.element.removeChild(countEl);
        this.garagePanel.resetBtnDisable(false);
        responses.forEach(async (duration, index) => {
          this.carsList.raceCarField(responsesCar[index], duration);
          const drive: boolean = await this.responseDrive(responsesCar[index], Status.drive);
          if (!drive) this.carsList.stopCarField(responsesCar[index].id);
        });
        clearInterval(timerId);
      }
    }, 1000);

    responsesCar = await this.garageService.getCars(this.context.getCarsPage());
    const responsesEngine: Promise<number>[] = responsesCar.map((car) => this.responseEngine(car, Status.started));
    responses = await Promise.all(responsesEngine);
  }

  async resetAll(): Promise<void> {
    this.carsList.resetWinnerId();
    this.garagePanel.resetBtnDisable(true);
    const responsesCar: Array<ICar> = await this.garageService.getCars(this.context.getCarsPage());
    responsesCar.forEach((car: ICar) => {
      this.carsList.resetCarField(car.id);
    });
    const responsesEngine: Promise<number>[] = responsesCar.map((car) => this.responseEngine(car, Status.stopped));
    await Promise.all(responsesEngine);
    this.garagePagination.paginationBtnDisable();
    this.updateRaceBtnDisable(false);
  }

  async selectCar(car: ICar): Promise<void> {
    const response: ICar = await this.garageService.getCar(car.id);
    this.garagePanel.setCarForUpdate(response);
    this.garagePanel.updateBtnDisable(false);
  }

  async removeCar(car: ICar): Promise<void> {
    const response: ICar = await this.garageService.deleteCar(car.id);
    if (response) {
      this.carsList.removeCarField(car);
      this.updateGarage();
      await this.removeWinner(car.id);
    }
  }

  async raceCar(car: ICar): Promise<void> {
    this.garagePanel.raceBtnDisable(true);
    this.carsList.startBtnDisable(car.id, true);
    const duration: number = await this.responseEngine(car, Status.started);
    this.carsList.raceCarField(car, duration, false);
    this.activeCarCount++;
    this.carsList.stopBtnDisable(car.id, false);
    const drive: boolean = await this.responseDrive(car, Status.drive);
    if (!drive) this.carsList.stopCarField(car.id);
  }

  async responseEngine(car: ICar, status: string): Promise<number> {
    const response: IEngine = await this.engineService.setEngine(car.id, status);
    const { velocity, distance } = response;
    return velocity ? distance / velocity : velocity;
  }

  async responseDrive(car: ICar, status: string): Promise<boolean> {
    const response: boolean = await this.engineService.setDrive(car.id, status);
    return response;
  }

  async resetCar(car: ICar): Promise<void> {
    this.activeCarCount--;
    this.carsList.resetCarField(car.id);
    await this.responseEngine(car, Status.stopped);
    if (this.activeCarCount === 0) this.garagePanel.raceBtnDisable(false);
    this.carsList.startBtnDisable(car.id, false);
    this.carsList.stopBtnDisable(car.id, true);
    this.carsList.resetCarField(car.id);
  }

  /**
   * Winners methods
   */

  async initWinners(): Promise<void> {
    await this.getWinnersCount();
    await this.updateWinners();
  }

  async getWinnersCount(): Promise<void> {
    const response: string | null = await this.winnersService.getWinnersCount();
    if (response) this.context.setWinnersCount(+response);
  }

  async updateWinners(
    page = this.context.getWinnersPage(),
    limit = WINNER_PER_PAGE,
    sort = Sort.time,
    order = Order.asc
  ): Promise<void> {
    await this.getWinnersCount();
    this.winnersList.reset();
    await this.getWinners(page, limit, sort, order);
    this.winnersHeader.updateContent(this.context.getWinnersCount(), page);
    this.winnersPagination.paginationBtnDisable();
  }

  async getWinners(page: number, limit: number, sort: string, order: string): Promise<void> {
    const response: Array<IWinner> = await this.winnersService.getWinners(page, limit, sort, order);
    response.forEach(async (winner: IWinner) => {
      const car: ICar = await this.garageService.getCar(winner.id);
      this.winnersList.addWinnerField(car, winner);
    });
  }

  async getWinner(car: ICar, time?: number): Promise<void> {
    const response: IWinner | null = await this.winnersService.getWinner(car.id);
    if (response && time) {
      const wins = response.wins + 1;
      if (response.time > time) {
        this.updateWinner(car, wins, time);
      }
      if (response.time <= time) {
        this.updateWinner(car, wins, response.time);
      }
    } else if (time) {
      this.createWinner(car, time);
    }
  }

  async createWinner(car: ICar, time: number): Promise<void> {
    const response: IWinner = await this.winnersService.createWinner(car.id, time);
    if (this.context.getWinnersPage() === this.context.getWinnersPageAll()) {
      this.winnersList.addWinnerField(car, response);
    }
    this.updateWinners();
  }

  async updateWinner(car: ICar, wins: number, time: number): Promise<void> {
    const response: IWinner = await this.winnersService.updateWinner(car.id, wins, time);
    this.winnersList.updateWinnerField(car, response);
    this.updateWinners();
  }

  async removeWinner(id: number): Promise<void> {
    const response: IWinner | null = await this.winnersService.getWinner(id);
    if (response) {
      await this.winnersService.deleteWinner(id);
      this.winnersList.removeWinnerField(id);
      this.updateWinners();
    }
  }
}
