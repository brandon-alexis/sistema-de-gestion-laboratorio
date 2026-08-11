export interface BaseRepository<T, K> {
  create(data: K): Promise<void>;
  findAll(): Promise<K[]>;
  findById(id: T): Promise<K | null>;
  update(id: T, data: K): Promise<void>;
  delete(id: T): Promise<void>;
}
