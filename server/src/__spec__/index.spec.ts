import * as admin from "firebase-admin";

import { getDb } from "../firebase-app";
import { IUser, User } from "../lib/entity/user";
import { Converter } from "./../lib/datasource/converter/index";
import { FirestoreDataSource } from "./../lib/datasource/firestore-datasource/index";
import { clearFirestore } from "./test-util/clear";
import { FirestoreCounter } from "./test-util/counter";

const db = getDb();

let userDocsCounter: FirestoreCounter;
let usersRef: () => admin.firestore.CollectionReference<IUser>;
let users: FirestoreDataSource<IUser, void, any>;

describe("datasource", () => {
  describe("loader", () => {
    beforeEach(async () => {
      await Promise.all([clearFirestore()]);

      userDocsCounter = new FirestoreCounter({ collection: "users" });
      usersRef = () => db.collection("users").withConverter(Converter<IUser>(userDocsCounter));
      users = new FirestoreDataSource(usersRef);
      users.initialize();
    });

    it.skip("docRef.get read doc from firestore", async () => {
      const userData = User.of();
      await users.ref().doc(userData.id).set(userData);

      const readUserDocFirst = (await users.ref().doc(userData.id).get()).data();
      const readUserDocAgain = (await users.ref().doc(userData.id).get()).data();

      expect(readUserDocFirst).toStrictEqual(userData);
      expect(readUserDocAgain).toStrictEqual(userData);
      expect(userDocsCounter.read.count).toBe(2);
    });

    it.skip("findOne read doc from loader", async () => {
      const userData = User.of();
      await users.ref().doc(userData.id).set(userData);

      const readUserDocFirst = await users.findOne((ref) => ref().doc(userData.id));
      const readUserDocAgain = await users.findOne((ref) => ref().doc(userData.id));

      expect(readUserDocFirst).toStrictEqual(userData);
      expect(readUserDocAgain).toStrictEqual(userData);
      expect(userDocsCounter.read.count).toBe(1);
    });

    it.skip("collectionRef.get read docs from firestore", async () => {
      const userDataList = [User.of({ id: "1" }), User.of({ id: "2" })];
      await Promise.all(userDataList.map((userData) => users.ref().doc(userData.id).set(userData)));

      const readUserDocsFirst = (await users.ref().orderBy("id", "asc").get()).docs.map((doc) =>
        doc.data()
      );
      const readUserDocsAgain = (await users.ref().orderBy("id", "asc").get()).docs.map((doc) =>
        doc.data()
      );

      expect(readUserDocsFirst).toStrictEqual(userDataList);
      expect(readUserDocsAgain).toStrictEqual(userDataList);
      expect(userDocsCounter.read.count).toBe(4);
    });

    it("after findMany read docs from firestore, findOne read doc from loader", async () => {
      const userDataList = [User.of({ id: "1" }), User.of({ id: "2" })];
      await Promise.all(userDataList.map((userData) => users.ref().doc(userData.id).set(userData)));

      const readUserDocsFirst = await users.findMany((ref) => ref().orderBy("id", "asc"));
      const readUserDocsAgain = await Promise.all(
        userDataList.map((userData) => users.findOne((ref) => ref().doc(userData.id)))
      );

      expect(readUserDocsFirst).toStrictEqual(userDataList);
      expect(readUserDocsAgain).toStrictEqual(userDataList);
      expect(userDocsCounter.read.count).toBe(2);
    });
  });
});
