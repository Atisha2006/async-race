import { BaseComponent } from '../../shared';

export class WinnersHeader extends BaseComponent {
  private title: HTMLElement;

  private page: HTMLElement;

  constructor() {
    super('div', ['winners-header']);
    this.title = document.createElement('h1');
    this.title.innerHTML = `Winner ()`;
    this.page = document.createElement('h2');
    this.page.innerHTML = `Page #`;
  }

  public updateContent(count: number, page: number): void {
    this.title.innerHTML = `Winners (${count})`;
    this.page.innerHTML = `Page #${page}`;
  }

  render(): HTMLElement {
    this.element.append(this.title, this.page);
    return this.element;
  }
}
