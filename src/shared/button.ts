import { BaseComponent } from './baseComponent';

export class Button extends BaseComponent {
  private readonly text: string;

  private readonly type: string;

  private readonly buttonClass: string;

  constructor(text: string, type: string, disable = false, buttonClass = '') {
    const classArr = buttonClass === '' ? ['btn'] : ['btn', buttonClass];
    super('button', classArr);
    this.text = text;
    this.type = type;
    this.buttonClass = buttonClass;
    this.setDisable(disable);
  }

  setDisable(val: boolean): void {
    if (val) this.element.classList.add('disable');
    else this.element.classList.remove('disable');
  }

  render(): HTMLElement {
    this.element.setAttribute('type', this.type);
    this.element.textContent = this.text;
    return this.element;
  }
}
