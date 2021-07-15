import './carField.scss';
import { BaseComponent, Button } from '../../shared';
import { CallbackCarType, ICar } from '../../models';

export class CarField extends BaseComponent {
  private selectBtn: Button;

  private removeBtn: Button;

  private startBtn: Button;

  private stopBtn: Button;

  private car: ICar;

  private carModel: HTMLElement;

  private name: HTMLElement;

  private animationFrameId: number;

  constructor(el: ICar) {
    super('div', ['car-feild']);
    this.car = el;
    this.selectBtn = new Button('select', 'button');
    this.removeBtn = new Button('remove', 'button');
    this.startBtn = new Button('a', 'button');
    this.stopBtn = new Button('b', 'button', true);
    this.carModel = document.createElement('div');
    this.carModel.classList.add('car');
    this.carModel.style.background = this.car.color;
    this.name = document.createElement('div');
    this.animationFrameId = undefined!;
  }

  addListeners(callbacks: Array<CallbackCarType>): void {
    const [selectFunc, removeFunc, raceFunc, resetFunc] = callbacks;
    this.selectBtn.element.addEventListener('click', () => {
      selectFunc(this.car);
    });
    this.removeBtn.element.addEventListener('click', () => {
      this.removeBtn.setDisable(true);
      removeFunc(this.car);
    });
    this.startBtn.element.addEventListener('click', () => {
      raceFunc(this.car);
    });
    this.stopBtn.element.addEventListener('click', () => {
      resetFunc(this.car);
    });
  }

  public start(callback: (car: ICar, duration: number) => void, car: ICar, duration: number, raceAll = true): void {
    const { clientWidth } = this.element;
    const distance: number = clientWidth - this.carModel.clientWidth;

    const start = performance.now();
    const draw = (progress: number) => {
      this.carModel.style.transform = `translateX(${progress * distance}px)`;
    };

    const timing = (timeFraction: number) => timeFraction;

    const animate = (time: number): void => {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
        if (raceAll) callback(car, duration);
      }
      const progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  public stop(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.carModel.style.transform = `translateX(0px)`;
  }

  public stopAnimate(): void {
    cancelAnimationFrame(this.animationFrameId);
  }

  public updateCar(car: ICar): void {
    this.name.textContent = car.name;
    this.carModel.style.background = car.color;
  }

  public raceAllBtnDisable(val: boolean): void {
    [this.selectBtn, this.removeBtn, this.startBtn].forEach((btn) => {
      btn.setDisable(val);
    });
  }

  public raceBtnDisable(val: boolean): void {
    this.startBtn.setDisable(val);
    this.removeBtn.setDisable(val);
  }

  public stopBtnDisable(val: boolean): void {
    this.stopBtn.setDisable(val);
  }

  render(): HTMLElement {
    const carNav = document.createElement('div');
    carNav.classList.add('car__nav');

    this.name.classList.add('car__name');
    this.name.textContent = this.car.name;

    const carControl = document.createElement('div');
    carControl.classList.add('car__control');

    const flag = document.createElement('div');
    flag.classList.add('car__flag');

    carNav.append(this.selectBtn.render(), this.removeBtn.render(), this.name);
    carControl.append(this.startBtn.render(), this.stopBtn.render());

    this.element.append(carNav, carControl, this.carModel, flag);
    return this.element;
  }
}
