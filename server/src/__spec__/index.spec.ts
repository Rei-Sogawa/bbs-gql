import { getDb } from "../firebase-app";
import { FirestoreDataSource } from "../lib/datasource/index";
import { IUser, User } from "../lib/entity/user";
import { Converter, replacer, reviver } from "./../lib/datasource/helper";
import { clearAuth, clearFirestore } from "./test-util/clear";

const db = getDb();

describe("datasource", () => {
  beforeAll(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });
  afterAll(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });

  it.skip("can add user doc", async () => {
    const user = User.of({ id: "1" });
    await db.collection("users").doc(user.id).set(user);
    const dSnap = await db.collection("users").doc(user.id).get();
    expect(dSnap.data()).toStrictEqual(user);
  });

  it("check cache", async () => {
    const users = new FirestoreDataSource<IUser>(
      db.collection("users").withConverter(Converter<IUser>())
    );
    users.initialize();
    users.cache.set("1", JSON.stringify({ id: "1" }, replacer));
    const cached = await users.cache.get("1");
    expect(cached).toBeTruthy();
    if (cached) {
      expect(JSON.parse(cached, reviver)).toStrictEqual({ id: "1" });
    }
  });
});
