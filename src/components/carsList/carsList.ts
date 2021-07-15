import { CallbackCarType, ICar } from '../../models';
import { BaseComponent } from '../../shared';
import { CarField } from '../carField';
import { WinPopup } from '../popup';

export class CarsList extends BaseComponent {
  private carsList: Map<number, CarField>;

  private callbacks: Array<CallbackCarType>;

  private getWinner: CallbackCarType;

  private winnerId: number;

  private popup: WinPopup;

  constructor() {
    super('div', ['car__list']);
    this.carsList = new Map();
    this.callbacks = undefined!;
    this.winnerId = -1;
    this.popup = new WinPopup();
    this.getWinner = undefined!;
  }

  addCallbacks(
    selectFunc: CallbackCarType,
    removeFunc: CallbackCarType,
    raceFunc: CallbackCarType,
    resetFunc: CallbackCarType,
    getWinner: CallbackCarType
  ): void {
    this.callbacks = [selectFunc, removeFunc, raceFunc, resetFunc];
    this.getWinner = getWinner;
  }

  addCarField(car: ICar): void {
    const carField = new CarField(car);
    carField.addListeners(this.callbacks);
    this.carsList.set(car.id, carField);
    this.element.append(carField.render());
  }

  updateCarField(car: ICar): void {
    const carField = this.carsList.get(car.id);
    if (carField) {
      carField.updateCar(car);
    }
  }

  removeCarField(car: ICar): void {
    const carField = this.carsList.get(car.id);
    if (carField) {
      this.element.removeChild(carField.element);
    }
    this.carsList.delete(car.id);
  }

  raceCarField(car: ICar, duration: number, raceAll?: boolean): void {
    const carField = this.carsList.get(car.id);
    if (carField) {
      carField.start(this.setWinner.bind(this), car, duration, raceAll);
    }
  }

  setWinner(car: ICar, duration: number): void {
    if (this.winnerId > 0) return;
    this.winnerId = car.id;
    const time: number = +(duration / 1000).toFixed(2);
    this.popup.show(car.name, time);
    this.getWinner(car, time);
  }

  resetCarField(id: number): void {
    const carField = this.carsList.get(id);
    if (carField) {
      carField.stop();
    }
  }

  stopCarField(id: number): void {
    const carField = this.carsList.get(id);
    if (carField) {
      carField.stopAnimate();
    }
  }

  resetWinnerId(): void {
    this.winnerId = -1;
  }

  raceBtnDisable(val: boolean): void {
    this.carsList.forEach((carField) => {
      carField.raceAllBtnDisable(val);
    });
  }

  startBtnDisable(id: number, val: boolean): void {
    const carField = this.carsList.get(id);
    if (carField) {
      carField.raceBtnDisable(val);
    }
  }

  stopBtnDisable(id: number, val: boolean): void {
    const carField = this.carsList.get(id);
    if (carField) {
      carField.stopBtnDisable(val);
    }
  }

  render(): HTMLElement {
    document.body.append(this.popup.render());
    return this.element;
  }
}
