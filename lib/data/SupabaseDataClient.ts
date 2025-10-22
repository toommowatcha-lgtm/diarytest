// FIX: Manually define types for import.meta.env as the vite/client types are not being picked up.
// This is a workaround because the triple-slash directive was failing to resolve vite/client.
declare global {
  interface ImportMeta {
    readonly env: {
      readonly VITE_SUPABASE_URL: string;
      readonly VITE_SUPABASE_ANON_KEY: string;
    };
  }
}

// TODO: Implement Supabase client
// import { createClient } from '@supabase/supabase-js';
import { IDataClient } from '@/lib/data/IDataClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export class SupabaseDataClient implements IDataClient {
  // private supabase = createClient(supabaseUrl, supabaseAnonKey);

  constructor() {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase URL or Anon Key is not configured. Please check your .env file.");
    }
  }

  async createTableIfMissing(table: string): Promise<void> {
    console.log(`[SupabaseDataClient] Table creation should be handled via migrations on the server. Requested table: "${table}"`);
    // In a real scenario, tables are created via Supabase migrations, not on the client.
    return Promise.resolve();
  }

  async list<T>(table: string): Promise<T[]> {
    // TODO: Implement list with Supabase
    // const { data, error } = await this.supabase.from(table).select('*');
    // if (error) throw error;
    // return data as T[];
    throw new Error('SupabaseDataClient.list not implemented.');
  }

  async get<T>(table: string, id: string): Promise<T | null> {
    // TODO: Implement get with Supabase
    // const { data, error } = await this.supabase.from(table).select('*').eq('id', id).single();
    // if (error) {
    //   if (error.code === 'PGRST116') return null; // Not found
    //   throw error;
    // }
    // return data as T | null;
    throw new Error('SupabaseDataClient.get not implemented.');
  }

  async upsert<T extends { id: string }>(table: string, payload: T): Promise<T> {
    // TODO: Implement upsert with Supabase
    // const { data, error } = await this.supabase.from(table).upsert(payload).select().single();
    // if (error) throw error;
    // return data as T;
    throw new Error('SupabaseDataClient.upsert not implemented.');
  }

  async delete(table: string, id: string): Promise<void> {
    // TODO: Implement delete with Supabase
    // const { error } = await this.supabase.from(table).delete().match({ id });
    // if (error) throw error;
    throw new Error('SupabaseDataClient.delete not implemented.');
  }

  async clear(table: string): Promise<void> {
     // This is a dangerous operation on a real backend and should likely be disabled or restricted.
     console.warn(`[SupabaseDataClient] clear(${table}) called. This is a destructive operation.`);
     throw new Error('SupabaseDataClient.clear not implemented.');
  }
}
