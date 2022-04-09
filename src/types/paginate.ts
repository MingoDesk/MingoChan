export interface IPaginateResult<T> {
  hasNext: boolean;
  hasPrevious: boolean;
  next?: string;
  previous?: string;
  results: T[];
}
