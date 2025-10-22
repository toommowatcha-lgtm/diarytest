
export interface IDataClient {
  list<T>(table: string): Promise<T[]>;
  get<T>(table: string, id: string): Promise<T | null>;
  upsert<T extends { id: string }>(table: string, payload: T): Promise<T>;
  delete(table: string, id: string): Promise<void>;
  createTableIfMissing(table: string): Promise<void>;
  clear(table: string): Promise<void>;
}
