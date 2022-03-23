import { signUp } from "../../../src/core/usecase/mutation/signUp";
import { clearAuth, clearFirestore } from "../../test-util/clear";
import { getAuth, getDb } from "../../test-util/setup";
import { createCollections } from "./../../../src/fire/createCollections";

describe("signUp", () => {
  const context = {
    auth: getAuth(),
    collections: createCollections(getDb()),
  };

  beforeEach(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });
  afterAll(async () => {
    await Promise.all([clearAuth(), clearFirestore()]);
  });

  describe("正常系", () => {
    it("正しい入力値の場合は、ユーザー登録される", async () => {
      const input = { displayName: "user-1", email: "user-1@example.com", password: "password" };

      const user = await signUp({}, { input }, context);

      const authUser = await getAuth().getUser(user.id);
      const userSnap = await getDb().collection("users").doc(user.id).get();
      const userSnapData = decodeTimestampToDate(userSnap.data());

      expect(authUser.email).toBe("user-1@example.com");
      expect(authUser.uid).toBe(userSnap.id);
      expect(userSnapData).toMatchObject({ displayName: "user-1" });
    });
  });

  describe("異常系", () => {
    it("表示名が空の場合は、エラー", async () => {
      const input = { displayName: "", email: "user-1@example.com", password: "password" };

      return expect(signUp({}, { input }, context)).rejects.toThrowError();
    });
  });
});
