import './garagePanel.scss';
import { BaseComponent, Button, Input } from '../../shared';
import { ICar, CallbackCarType, CallbackType } from '../../models';
import { COLOR_DEFAULT } from '../../core';

export class GaragePanel extends BaseComponent {
  private nameCreate: Input;

  private colorCreate: Input;

  private nameUpdate: Input;

  private colorUpdate: Input;

  private createBtn: Button;

  private updateBtn: Button;

  private resetBtn: Button;

  private raceBtn: Button;

  private generateCarBtn: Button;

  private idUpdate: number;

  constructor() {
    super('div', ['garage-panel']);
    this.nameCreate = new Input('name', 'text', 'input_name');
    this.colorCreate = new Input('color', 'color', 'input_color', COLOR_DEFAULT);
    this.createBtn = new Button('create', 'button');
    this.nameUpdate = new Input('name', 'text', 'input_name');
    this.colorUpdate = new Input('color', 'color', 'input_color', COLOR_DEFAULT);
    this.updateBtn = new Button('update', 'button', true);
    this.raceBtn = new Button('race', 'button');
    this.resetBtn = new Button('reset', 'button', true);
    this.generateCarBtn = new Button('generate cars', 'button');
    this.idUpdate = -1;
  }

  addListeners(
    createFunc: CallbackCarType,
    updateFunc: CallbackCarType,
    generateFunc: CallbackType,
    raceFunc: CallbackType,
    resetFunc: CallbackType
  ): void {
    this.createBtn.element.addEventListener('click', () => {
      const car: ICar = {
        name: this.nameCreate.element.value,
        color: this.colorCreate.element.value,
        id: -1
      };
      createFunc(car);
      this.resetCreateInput();
    });
    this.updateBtn.element.addEventListener('click', () => {
      const car: ICar = {
        name: this.nameUpdate.element.value,
        color: this.colorUpdate.element.value,
        id: this.idUpdate
      };
      updateFunc(car);
      this.resetUpdateInput();
    });
    this.generateCarBtn.element.addEventListener('click', () => {
      generateFunc();
    });
    this.raceBtn.element.addEventListener('click', () => {
      raceFunc();
    });
    this.resetBtn.element.addEventListener('click', () => {
      resetFunc();
    });
  }

  setCarForUpdate(car: ICar): void {
    const { name, color, id } = car;
    this.nameUpdate.element.value = name;
    this.colorUpdate.element.value = color;
    this.idUpdate = id;
  }

  resetUpdateInput(): void {
    this.nameUpdate.element.value = '';
    this.colorUpdate.element.value = COLOR_DEFAULT;
  }

  resetCreateInput(): void {
    this.nameCreate.element.value = '';
    this.colorCreate.element.value = COLOR_DEFAULT;
  }

  updateBtnDisable(val: boolean): void {
    if (val) this.resetUpdateInput();
    this.updateBtn.setDisable(val);
  }

  generateBtnDisable(val: boolean): void {
    this.generateCarBtn.setDisable(val);
  }

  resetBtnDisable(val: boolean): void {
    this.resetBtn.setDisable(val);
  }

  raceBtnDisable(val: boolean): void {
    [this.createBtn, this.raceBtn, this.generateCarBtn].forEach((btn) => {
      btn.setDisable(val);
    });
  }

  render(): HTMLElement {
    const formCreate = document.createElement('div');
    formCreate.classList.add('form', 'form_create');

    const formUpdate = document.createElement('div');
    formUpdate.classList.add('form', 'form_update');

    const raceControl = document.createElement('div');
    raceControl.classList.add('race-control');

    formCreate.append(this.nameCreate.render(), this.colorCreate.render(), this.createBtn.render());
    formUpdate.append(this.nameUpdate.render(), this.colorUpdate.render(), this.updateBtn.render());
    raceControl.append(this.raceBtn.render(), this.resetBtn.render(), this.generateCarBtn.render());

    this.element.append(formCreate, formUpdate, raceControl);
    return this.element;
  }
}
