import { BaseComponent } from '../shared';

export interface IContent extends BaseComponent {
  show(): void;
  hide(): void;
  render(): HTMLElement;
}
