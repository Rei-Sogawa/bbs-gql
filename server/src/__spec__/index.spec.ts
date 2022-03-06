import { getDb } from "../firebase-app";
import { FirestoreDataSource } from "../lib/datasource/index";
import { IUser, User } from "../lib/entity/user";
import { Converter, replacer, reviver } from "./../lib/datasource/helper";
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

describe("datasource", () => {
  beforeAll(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });
  afterAll(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });

  it("can add user doc", async () => {
    const user = User.of({ id: "1" });
    await usersRef.doc(user.id).set(user);
    const dSnap = await usersRef.doc(user.id).get();
    expect(dSnap.data()).toStrictEqual(user);
  });

  it("check cache", async () => {
    const users = new FirestoreDataSource<IUser>(usersRef);
    users.initialize();
    const user = User.of({ id: "1" });
    users.cache.set(user.id, JSON.stringify(user, replacer));
    const cached = await users.cache.get(user.id);
    expect(cached).toBeTruthy();
    if (cached) {
      expect(JSON.parse(cached, reviver)).toStrictEqual(user);
    }
  });
});
