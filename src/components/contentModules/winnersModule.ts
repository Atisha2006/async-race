import { IContent } from '../../models';
import { BaseComponent } from '../../shared';
import { WinnersHeader } from '../pageHeader';
import { WinnersPagination } from '../pagination';
import { WinnersHeaderList, WinnersList } from '../winnersList';

export class WinnersModule extends BaseComponent implements IContent {
  private winnersHeader: WinnersHeader;

  private winnersList: WinnersList;

  private winnersPagination: WinnersPagination;

  private winnersHeaderList: WinnersHeaderList;

  constructor() {
    super('div', ['content', 'hide']);
    this.winnersHeader = new WinnersHeader();
    this.winnersList = new WinnersList();
    this.winnersHeaderList = new WinnersHeaderList();
    this.winnersPagination = new WinnersPagination();
  }

  getContext(): [WinnersHeader, WinnersHeaderList, WinnersList, WinnersPagination] {
    return [this.winnersHeader, this.winnersHeaderList, this.winnersList, this.winnersPagination];
  }

  hide(): void {
    this.element.classList.add('hide');
  }

  show(): void {
    this.element.classList.remove('hide');
  }

  render(): HTMLElement {
    this.element.append(
      this.winnersHeader.render(),
      this.winnersHeaderList.render(),
      this.winnersList.render(),
      this.winnersPagination.render()
    );
    return this.element;
  }
}
