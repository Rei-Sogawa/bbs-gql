import { getDb } from "../firebase-app";
import { User } from "../lib/entity/user";
import { clearAuth, clearFirestore } from "./test-util/clear";

const db = getDb();

describe("datasource", () => {
  beforeAll(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });
  afterAll(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });

  it("can add user doc", async () => {
    const user = User.of({ id: "1" });
    await db.collection("users").doc(user.id).set(user);
    const dSnap = await db.collection("users").doc(user.id).get();
    expect(dSnap.data()).toStrictEqual(user);
  });
});
