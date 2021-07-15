import { Context } from '../../core';
import { CallbackType } from '../../models';
import { BaseComponent, Button } from '../../shared';

export class WinnersPagination extends BaseComponent {
  private prevBtn: Button;

  private nextBtn: Button;

  private context: Context;

  constructor() {
    super('div', ['pagination']);
    this.context = Context.getInstance();
    this.prevBtn = new Button('prev', 'button', true);
    this.nextBtn = new Button('next', 'button');
  }

  addListeners(updateWinners: CallbackType): void {
    this.prevBtn.element.addEventListener('click', () => {
      this.context.setWinnersPage(false);
      const currentPage = this.context.getWinnersPage();
      const countPage = this.context.getWinnersPageAll();
      if (currentPage === 1) {
        this.prevBtn.setDisable(true);
      }
      if (currentPage < countPage) {
        this.nextBtn.setDisable(false);
      }
      updateWinners();
    });
    this.nextBtn.element.addEventListener('click', () => {
      this.context.setWinnersPage(true);
      const currentPage = this.context.getWinnersPage();
      const countPage = this.context.getWinnersPageAll();
      if (currentPage > 1) {
        this.prevBtn.setDisable(false);
      }
      if (currentPage >= countPage) {
        this.nextBtn.setDisable(true);
      }
      updateWinners();
    });
  }

  public paginationBtnDisable(): void {
    const currentPage = this.context.getWinnersPage();
    const countPage = this.context.getWinnersPageAll();
    if (currentPage === 1) {
      this.prevBtn.setDisable(true);
    }
    if (currentPage < countPage) {
      this.nextBtn.setDisable(false);
    }
    if (currentPage > 1) {
      this.prevBtn.setDisable(false);
    }
    if (currentPage >= countPage) {
      this.nextBtn.setDisable(true);
    }
  }

  render(): HTMLElement {
    this.element.append(this.prevBtn.render(), this.nextBtn.render());
    return this.element;
  }
}
