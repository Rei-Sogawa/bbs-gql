export abstract class Repository<TEntity> {
  abstract findById(id: string): Promise<TEntity>;
  abstract create(entity: TEntity): Promise<TEntity>;
  abstract update(entity: TEntity): Promise<TEntity>;
  abstract delete(entity: TEntity): Promise<TEntity>;
}
