export interface IWinnerRequest {
  page: number;
  limit: number;
  sort: 'id' | 'wins' | 'time';
  order: 'ASC' | 'DESC';
}
