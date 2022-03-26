import { CommentData, CommentDataSchema, CommentDoc } from "../doc";
import { Collection } from "../lib/collection";
import { CollectionRef } from "../lib/type";
import { PageInfo, PaginateInput } from "./helper";

type Edge = {
  node: CommentDoc;
  cursor: Date;
};

type FindAllOutput = {
  edges: Edge[];
  pageInfo: PageInfo;
};

export class CommentsCollection extends Collection<CommentData, CommentDoc> {
  constructor(ref: CollectionRef) {
    super(ref, CommentDataSchema.parse, CommentDoc.of);
  }

  async findAll(input: PaginateInput): Promise<FindAllOutput> {
    const { first, after, last, before } = input;

    const forward = ["createdAt", "asc"] as const;
    const backward = ["createdAt", "desc"] as const;

    const nodes = await (async () => {
      if (first) {
        return after
          ? this.findManyByQuery((ref) =>
              ref
                .orderBy(...forward)
                .startAfter(after)
                .limit(first)
            )
          : this.findManyByQuery((ref) => ref.orderBy(...forward).limit(first));
      }
      if (last) {
        const _topics = before
          ? this.findManyByQuery((ref) =>
              ref
                .orderBy(...backward)
                .startAfter(before)
                .limit(last)
            )
          : this.findManyByQuery((ref) => ref.orderBy(...backward).limit(last));
        return (await _topics).reverse();
      }
      return this.findManyByQuery((ref) => ref.orderBy(...forward));
    })();

    const edges = nodes.map((v) => ({ node: v, cursor: v.createdAt }));
    const endCursor = edges.at(-1)?.cursor;
    const startCursor = edges.at(0)?.cursor;
    const hasNextPage = endCursor
      ? (
          await this.findManyByQuery((ref) =>
            ref
              .orderBy(...forward)
              .startAfter(endCursor)
              .limit(1)
          )
        ).length > 0
      : false;
    const hasPreviousPage = startCursor
      ? (
          await this.findManyByQuery((ref) =>
            ref
              .orderBy(...forward)
              .endBefore(startCursor)
              .limit(1)
          )
        ).length > 0
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
