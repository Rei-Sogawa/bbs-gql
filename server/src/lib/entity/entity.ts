export abstract class Entity<Raw extends { id: string }> {
  abstract id: string;
  abstract toRaw(): Raw;
  abstract toRawData(): Omit<Raw, "id">;
}
