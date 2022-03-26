import { TopicData, TopicDataSchema, TopicDoc } from "../doc";
import { Collection } from "../lib/collection";
import { CollectionRef } from "../lib/type";

type FindAllInput = {
  first?: number | null;
  after?: Date | null;
  last?: number | null;
  before?: Date | null;
};

type Edge = {
  node: TopicDoc;
  cursor: Date;
};

type PageInfo = {
  startCursor?: Date;
  endCursor?: Date;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type FindAllOutput = {
  edges: Edge[];
  pageInfo: PageInfo;
};

export class TopicsCollection extends Collection<TopicData, TopicDoc> {
  constructor(ref: CollectionRef) {
    super(ref, TopicDataSchema.parse, TopicDoc.of);
  }
  async findAll(input: FindAllInput): Promise<FindAllOutput> {
    const { first, after, last, before } = input;

    const topics = await (() => {
      if (first) {
        return after
          ? this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc").startAfter(after).limit(first))
          : this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc").limit(first));
      }
      if (last) {
        before
          ? this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc").endBefore(before).limit(last))
          : this.findManyByQuery((ref) => ref.orderBy("createdAt", "asc").limit(last));
      }
      throw new Error("Not specified first or after");
    })();

    const edges = topics.map((v) => ({ node: v, cursor: v.createdAt }));
    const endCursor = edges.at(-1)?.cursor;
    const startCursor = edges.at(-1)?.cursor;
    const hasNextPage = endCursor
      ? (await this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc").startAfter(endCursor).limit(1))).length >
        0
      : false;
    const hasPreviousPage = startCursor
      ? (await this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc").endBefore(startCursor).limit(1))).length >
        0
      : false;

    return {
      edges,
      pageInfo: {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }
}
