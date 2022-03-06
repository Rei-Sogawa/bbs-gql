import * as admin from "firebase-admin";

it("trivial", () => {
  const a = admin.firestore.Timestamp.now();
  expect(a).toStrictEqual(a);
});
