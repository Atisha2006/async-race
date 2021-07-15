import { BaseComponent, NavButton } from '../../shared';

export class Navbar extends BaseComponent {
  private buttons: NavButton[] = [];

  constructor() {
    super('nav', ['navbar']);
  }

  append(button: NavButton): void {
    this.buttons = [...this.buttons, button];
    this.addActive();
  }

  addActive(): void {
    this.buttons.forEach((button) => {
      button.element.addEventListener('click', () => {
        this.buttons.forEach((el) => {
          el.element.classList.remove('active');
        });
        button.element.classList.add('active');
      });
    });
  }

  render(): HTMLElement {
    const ulNav: HTMLElement = document.createElement('ul');
    ulNav.classList.add('nav');
    this.buttons.forEach((button) => ulNav.appendChild(button.render()));
    this.element.appendChild(ulNav);
    return this.element;
  }
}
