import './popup.scss';
import { BaseComponent } from '../../shared';

export class WinPopup extends BaseComponent {
  constructor() {
    super('div', ['overlay', 'hidden', 'pyro']);
    this.element.addEventListener('click', () => {
      this.hide();
    });
  }

  show(name: string, time: number): void {
    const before = document.createElement('div');
    before.classList.add('before');
    const after = document.createElement('div');
    after.classList.add('after');
    const popupInner = document.createElement('div');
    popupInner.classList.add('popup__inner');
    popupInner.innerHTML = `The Winner of race:<br> ${name}!!!<br> (Time: ${time}s)`;
    this.element.append(before, after, popupInner);
    this.element.classList.remove('hidden');
  }

  hide(): void {
    this.element.classList.add('hidden');
    this.element.innerHTML = '';
  }

  render(): HTMLElement {
    return this.element;
  }
}
