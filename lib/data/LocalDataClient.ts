import localforage from 'localforage';
import { IDataClient } from '@/lib/data/IDataClient';

// localforage can be configured to use specific drivers
localforage.config({
  name: 'StockDiaryDB',
  storeName: 'stock_diary_store',
  description: 'Local database for StockDiary application',
});

export class LocalDataClient implements IDataClient {
  private getTableKey(table: string): string {
    return `table_${table}`;
  }

  async createTableIfMissing(table: string): Promise<void> {
    // With localforage using a single key-value store, table creation is implicit.
    // We just ensure there's an entry for the table.
    const tableKey = this.getTableKey(table);
    const existing = await localforage.getItem<Record<string, unknown>>(tableKey);
    if (existing === null) {
      await localforage.setItem(tableKey, {});
    }
    console.log(`[LocalDataClient] Table "${table}" ensured.`);
  }

  async list<T>(table: string): Promise<T[]> {
    const tableKey = this.getTableKey(table);
    await this.createTableIfMissing(table);
    const data = await localforage.getItem<Record<string, T>>(tableKey);
    return data ? Object.values(data) : [];
  }

  async get<T>(table: string, id: string): Promise<T | null> {
    const tableKey = this.getTableKey(table);
    await this.createTableIfMissing(table);
    const data = await localforage.getItem<Record<string, T>>(tableKey);
    return data?.[id] || null;
  }

  async upsert<T extends { id: string }>(table: string, payload: T): Promise<T> {
    const tableKey = this.getTableKey(table);
    await this.createTableIfMissing(table);
    const data = (await localforage.getItem<Record<string, T>>(tableKey)) || {};
    data[payload.id] = payload;
    await localforage.setItem(tableKey, data);
    console.log(`[LocalDataClient] Upserted item ${payload.id} in table "${table}"`);
    return payload;
  }

  async delete(table: string, id: string): Promise<void> {
    const tableKey = this.getTableKey(table);
    await this.createTableIfMissing(table);
    const data = await localforage.getItem<Record<string, unknown>>(tableKey);
    if (data && data[id]) {
      delete data[id];
      await localforage.setItem(tableKey, data);
      console.log(`[LocalDataClient] Deleted item ${id} from table "${table}"`);
    }
  }

  async clear(table: string): Promise<void> {
    const tableKey = this.getTableKey(table);
    await localforage.setItem(tableKey, {});
    console.log(`[LocalDataClient] Cleared table "${table}"`);
  }
}