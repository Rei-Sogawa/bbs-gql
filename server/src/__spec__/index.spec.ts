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
  afterAll(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });

  it("findOne", async () => {
    const user = User.of({ id: "1", updatedAt: admin.firestore.Timestamp.now() });

    await users.collection.doc("1").set(user);

    const readFromCacheFirst = await users.findOne("1", { ttl: 60 });

    const updatedUser = User.of({ ...user, updatedAt: admin.firestore.Timestamp.now() });

    await users.collection.doc("1").set(updatedUser, { merge: true });

    const readFromCacheSecond = await users.findOne("1", { ttl: 60 });

    expect(readFromCacheSecond).toStrictEqual(readFromCacheFirst);
  });
});
