import { BaseComponent } from './baseComponent';

export class NavButton extends BaseComponent {
  private readonly text: string;

  private readonly icon: string;

  private readonly target: string;

  private readonly active?: string;

  constructor(text: string, icon: string, target: string, active?: string) {
    super('li', ['nav__item']);
    this.text = text;
    this.icon = icon;
    this.target = target;
    if (active) {
      this.active = active;
      this.element.classList.add(this.active);
    }
  }

  render(): HTMLElement {
    this.element.innerHTML = `
      <a href="#${this.target}" class="nav__link" 
      style="background-image: url(./icons/${this.icon})">${this.text}</a>
    `;
    return this.element;
  }
}
