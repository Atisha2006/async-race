export class Input {
  element: HTMLInputElement;

  constructor(name: string, type: string, inputClass: string, value?: string) {
    this.element = document.createElement('input');
    this.element.classList.add('input', inputClass);
    this.element.setAttribute('name', name);
    this.element.setAttribute('type', type);
    if (value) {
      this.element.setAttribute('value', value);
    }
  }

  render(): HTMLElement {
    return this.element;
  }
}
