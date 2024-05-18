export type PaginatedData<T> = {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
};
