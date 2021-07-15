import { IContent } from '../../models';
import { BaseComponent } from '../../shared';
import { GaragePanel } from '../garagePanel';
import { CarsList } from '../carsList';
import { GarageHeader } from '../pageHeader';
import { GaragePagination } from '../pagination';

export class GarageModule extends BaseComponent implements IContent {
  private garagePanel: GaragePanel;

  private garageHeader: GarageHeader;

  private garagePagination: GaragePagination;

  private carsList: CarsList;

  constructor() {
    super('div', ['content']);
    this.garagePanel = new GaragePanel();
    this.garageHeader = new GarageHeader();
    this.carsList = new CarsList();
    this.garagePagination = new GaragePagination();
  }

  getContext(): [GaragePanel, GarageHeader, CarsList, GaragePagination] {
    return [this.garagePanel, this.garageHeader, this.carsList, this.garagePagination];
  }

  hide(): void {
    this.element.classList.add('hide');
  }

  show(): void {
    this.element.classList.remove('hide');
  }

  render(): HTMLElement {
    this.element.append(
      this.garagePanel.render(),
      this.garageHeader.render(),
      this.carsList.render(),
      this.garagePagination.render()
    );
    return this.element;
  }
}
