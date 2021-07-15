import { ICar, IWinner } from '../../models';
import { BaseComponent } from '../../shared';
import { WinnerField } from '../winnerField';

export class WinnersList extends BaseComponent {
  private winnersList: Map<number, WinnerField>;

  constructor() {
    super('div', ['winner__list']);
    this.winnersList = new Map();
  }

  addWinnerField(car: ICar, winner: IWinner): void {
    const winnerField = new WinnerField(car, winner);
    this.winnersList.set(winner.id, winnerField);
    this.element.appendChild(winnerField.render());
  }

  updateWinnerField(car: ICar, winner: IWinner): void {
    const winnerField = this.winnersList.get(winner.id);
    if (winnerField) {
      winnerField.updateWinner(car, winner);
    }
  }

  removeWinnerField(id: number): void {
    const winnerField = this.winnersList.get(id);
    if (winnerField) {
      this.element.removeChild(winnerField.element);
    }
    this.winnersList.delete(id);
  }

  reset(): void {
    this.element.innerHTML = ``;
  }

  render(): HTMLElement {
    return this.element;
  }
}
