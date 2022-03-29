import { FireCollection } from "@rei-sogawa/unfireorm";
import { CollectionReference, PaginateInput } from "@rei-sogawa/unfireorm/dist/types";

import { TopicData, TopicDataSchema, TopicDoc } from "../doc";
import { createConverter } from "./../lib/helper";

export class TopicsCollection extends FireCollection<TopicData, TopicDoc> {
  constructor(ref: CollectionReference) {
    super({ ref, parse: TopicDataSchema.parse, transformer: TopicDoc.of, converter: createConverter<TopicData>() });
  }

  findAll(input: PaginateInput<Date>) {
    return this.paginate({
      paginateInput: input,
      forward: this.ref.orderBy("createdAt", "desc"),
      backward: this.ref.orderBy("createdAt", "asc"),
      cursorField: "createdAt",
    });
  }
}
