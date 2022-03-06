import * as admin from "firebase-admin";

import { getDb } from "../firebase-app";
import { FirestoreDataSource } from "../lib/datasource/index";
import { IUser, User } from "../lib/entity/user";
import { Converter } from "./../lib/datasource/helper";
import { clearAuth, clearFirestore } from "./test-util/clear";
import { ReadCounter, WriteCounter } from "./test-util/counter";

const db = getDb();

const usersReadCounter = new ReadCounter("users");
const usersWriteCounter = new WriteCounter("users");

const usersRef = db.collection("users").withConverter(
  Converter<IUser>({
    logger: {
      onRead: () => usersReadCounter.log(),
      onWrite: () => usersWriteCounter.log(),
    },
  })
);

const users = new FirestoreDataSource<IUser>(usersRef);
users.initialize();

describe("datasource", () => {
  beforeAll(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });

  it("findMany", async () => {
    const createdAt = new Date("2000-01-01");

    const newDocs = Array.from({ length: 25 }).map((_, idx) =>
      User.of({
        id: idx.toString(),
        createdAt: admin.firestore.Timestamp.fromDate(createdAt),
        updatedAt: admin.firestore.Timestamp.fromDate(createdAt),
      })
    );

    await Promise.all(newDocs.map((user) => users.collection.doc(user.id).set(user)));

    const readDocs = await users.findMany(
      newDocs.map((user) => user.id),
      { ttl: 60 }
    );

    const updatedAt = new Date("2020-01-01");

    const editedDocs = newDocs.map((user) =>
      User.of({ ...user, updatedAt: admin.firestore.Timestamp.fromDate(updatedAt) })
    );

    await Promise.all(editedDocs.map((user) => users.collection.doc(user.id).set(user)));

    const readDocsAgain = await users.findMany(
      newDocs.map((user) => user.id),
      { ttl: 60 }
    );

    expect(newDocs).toStrictEqual(readDocs);
    expect(readDocs).toStrictEqual(readDocsAgain);
  });
});
