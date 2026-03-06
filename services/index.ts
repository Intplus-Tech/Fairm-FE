export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
