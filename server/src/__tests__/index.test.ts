import { getDb } from "../firebase-app";

const db = getDb();

it("trivial", () => {
  expect(1).toBe(1);
});

it("add doc", async () => {
  const data = { name: "Alice" };
  await db.collection("users").doc("1").set(data);
  const dSnap = await db.collection("users").doc("1").get();
  expect(dSnap.data()).toStrictEqual(data);
});
