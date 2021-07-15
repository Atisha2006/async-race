import { BaseComponent } from '../../shared';

export class GarageHeader extends BaseComponent {
  private title: HTMLElement;

  private page: HTMLElement;

  constructor() {
    super('div', ['garage-header']);
    this.title = document.createElement('h1');
    this.title.innerHTML = `Garage ()`;
    this.page = document.createElement('h2');
    this.page.innerHTML = `Page #`;
  }

  public updateContent(count: number, page: number): void {
    this.title.innerHTML = `Garage (${count})`;
    this.page.innerHTML = `Page #${page}`;
  }

  render(): HTMLElement {
    this.element.append(this.title, this.page);
    return this.element;
  }
}
