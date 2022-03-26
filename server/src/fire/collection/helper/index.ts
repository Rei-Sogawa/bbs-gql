export type PaginateInput = {
  first?: number | null;
  after?: Date | null;
  last?: number | null;
  before?: Date | null;
};

export type PageInfo = {
  startCursor?: Date;
  endCursor?: Date;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
