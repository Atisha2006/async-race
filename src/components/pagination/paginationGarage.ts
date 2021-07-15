import { Context } from '../../core';
import { CallbackType } from '../../models';
import { BaseComponent, Button } from '../../shared';

export class GaragePagination extends BaseComponent {
  private prevBtn: Button;

  private nextBtn: Button;

  private context: Context;

  constructor() {
    super('div', ['pagination']);
    this.context = Context.getInstance();
    this.prevBtn = new Button('prev', 'button', true);
    this.nextBtn = new Button('next', 'button');
  }

  addListeners(updateGarage: CallbackType): void {
    this.prevBtn.element.addEventListener('click', () => {
      this.context.setCarsPage(false);
      const currentPage = this.context.getCarsPage();
      const countPage = this.context.getCarsPageAll();
      if (currentPage === 1) {
        this.prevBtn.setDisable(true);
      }
      if (currentPage < countPage) {
        this.nextBtn.setDisable(false);
      }
      updateGarage();
    });
    this.nextBtn.element.addEventListener('click', () => {
      this.context.setCarsPage(true);
      const currentPage = this.context.getCarsPage();
      const countPage = this.context.getCarsPageAll();
      if (currentPage > 1) {
        this.prevBtn.setDisable(false);
      }
      if (currentPage >= countPage) {
        this.nextBtn.setDisable(true);
      }
      updateGarage();
    });
  }

  public paginationBtnDisable(): void {
    const currentPage = this.context.getCarsPage();
    const countPage = this.context.getCarsPageAll();
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

  public paginationAllDisable(val: boolean): void {
    this.prevBtn.setDisable(val);
    this.nextBtn.setDisable(val);
  }

  render(): HTMLElement {
    this.element.append(this.prevBtn.render(), this.nextBtn.render());
    return this.element;
  }
}
