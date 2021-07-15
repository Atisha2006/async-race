import './winnerField.scss';
import { BaseComponent } from '../../shared';
import { ICar, IWinner } from '../../models';

export class WinnerField extends BaseComponent {
  private carModel: HTMLElement;

  private number: HTMLElement;

  private wins: HTMLElement;

  private name: HTMLElement;

  private time: HTMLElement;

  constructor(car: ICar, winner: IWinner) {
    super('div', ['winner-feild']);
    this.number = document.createElement('div');
    this.number.classList.add('winner__number');
    this.carModel = document.createElement('div');
    this.carModel.classList.add('winner__car');
    this.carModel.style.background = car.color;
    this.name = document.createElement('div');
    this.name.classList.add('winner__name');
    this.name.textContent = car.name;
    this.wins = document.createElement('div');
    this.wins.classList.add('winner__wins');
    this.wins.textContent = String(winner.wins);
    this.time = document.createElement('div');
    this.time.classList.add('winner__time');
    this.time.textContent = String(winner.time);
  }

  public updateWinner(car: ICar, winner: IWinner): void {
    this.name.textContent = car.name;
    this.carModel.style.background = car.color;
    this.wins.textContent = String(winner.wins);
    this.time.textContent = String(winner.time);
  }

  render(): HTMLElement {
    this.element.append(this.number, this.carModel, this.name, this.wins, this.time);
    return this.element;
  }
}
