import { Context, Order, Sort, WINNER_PER_PAGE } from '../../core';
import { CallbackSortType } from '../../models';
import { BaseComponent } from '../../shared';

export class WinnersHeaderList extends BaseComponent {
  private context: Context;

  private number: HTMLElement;

  private carModel: HTMLElement;

  private name: HTMLElement;

  private wins: HTMLElement;

  private time: HTMLElement;

  private activeSort: string;

  constructor() {
    super('div', ['winner-feild', 'winner-feild_header']);
    this.context = Context.getInstance();
    this.number = document.createElement('div');
    this.number.classList.add('winner__number');
    this.number.textContent = 'Number';
    this.carModel = document.createElement('div');
    this.carModel.classList.add('winner__car');
    this.carModel.textContent = 'Car';
    this.name = document.createElement('div');
    this.name.classList.add('winner__name');
    this.name.textContent = 'Name';
    this.wins = document.createElement('div');
    this.wins.classList.add('winner__wins');
    this.wins.textContent = 'Wins';
    this.time = document.createElement('div');
    this.time.classList.add('winner__time', 'asc');
    this.time.textContent = 'Time(seconds)';
    this.activeSort = Order.asc;
  }

  addListeners(getWinners: CallbackSortType): void {
    this.wins.addEventListener('click', () => {
      this.time.classList.remove('asc');
      this.time.classList.remove('desc');
      const currentPage = this.context.getWinnersPage();
      this.activeSort = this.activeSort === Order.asc ? Order.desc : Order.asc;
      getWinners(currentPage, WINNER_PER_PAGE, Sort.wins, this.activeSort);
      if (this.activeSort === Order.asc) {
        this.wins.classList.add('asc');
        this.wins.classList.remove('desc');
      } else {
        this.wins.classList.add('desc');
        this.wins.classList.remove('asc');
      }
    });
    this.time.addEventListener('click', () => {
      this.wins.classList.remove('asc');
      this.wins.classList.remove('desc');
      const currentPage = this.context.getWinnersPage();
      this.activeSort = this.activeSort === Order.asc ? Order.desc : Order.asc;
      getWinners(currentPage, WINNER_PER_PAGE, Sort.time, this.activeSort);
      if (this.activeSort === Order.asc) {
        this.time.classList.add('asc');
        this.time.classList.remove('desc');
      } else {
        this.time.classList.add('desc');
        this.time.classList.remove('asc');
      }
    });
  }

  render(): HTMLElement {
    this.element.append(this.number, this.carModel, this.name, this.wins, this.time);
    return this.element;
  }
}
