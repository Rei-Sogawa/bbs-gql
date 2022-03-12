import { KeyValueCache } from "apollo-server-caching";
import * as admin from "firebase-admin";

import { getDb } from "../../src/firebase-app";
import { ConverterCounter } from "../../src/lib/datasource/converter/counter";
import { Converter } from "../../src/lib/datasource/converter/index";
import { FirestoreDataSource } from "../../src/lib/datasource/firestore-datasource/index";
import { IUserData, UserData } from "../../src/lib/entity/user";
import { clearFirestore } from "../test-util/clear";

const db = getDb();

let userConverterCounter: ConverterCounter;
let usersRef: () => admin.firestore.CollectionReference<IUserData>;
let users: FirestoreDataSource<IUserData, void, any>;

const initializeDataSource = (cache?: KeyValueCache, converterCounter?: ConverterCounter) => {
  userConverterCounter = converterCounter ?? new ConverterCounter({ collection: "users" });
  usersRef = () => db.collection("users").withConverter(Converter<IUserData>(userConverterCounter));
  users = new FirestoreDataSource(usersRef);
  users.initialize({ context: undefined, cache });
};

describe("datasource", () => {
  beforeEach(async () => {
    await Promise.all([clearFirestore()]);
  });
  afterAll(async () => {
    await Promise.all([clearFirestore()]);
  });

  describe("get", () => {
    beforeEach(() => {
      initializeDataSource();
    });
    describe("by ref", () => {
      it("docRef.get should read doc from firestore", async () => {
        const userData = UserData.of();
        await users.ref().doc("1").set(userData);

        const readFirst = (await users.ref().doc("1").get()).data();
        const readAgain = (await users.ref().doc("1").get()).data();

        expect(readFirst).toStrictEqual(userData);
        expect(readAgain).toStrictEqual(userData);
        expect(userConverterCounter.read.count).toBe(2);
      });

      it("collectionRef.get should read docs from firestore", async () => {
        const userDataOne = UserData.of({
          createdAt: admin.firestore.Timestamp.fromDate(new Date("2000-01-01")),
          updatedAt: admin.firestore.Timestamp.fromDate(new Date("2000-01-01")),
        });
        const userDataTwo = UserData.of({
          createdAt: admin.firestore.Timestamp.fromDate(new Date("2020-01-01")),
          updatedAt: admin.firestore.Timestamp.fromDate(new Date("2020-01-01")),
        });
        await users.ref().doc("1").set(userDataOne);
        await users.ref().doc("2").set(userDataTwo);

        const readFirst = (await users.ref().orderBy("createdAt", "asc").get()).docs.map((doc) => doc.data());
        const readAgain = (await users.ref().orderBy("createdAt", "asc").get()).docs.map((doc) => doc.data());

        expect(readFirst).toStrictEqual([userDataOne, userDataTwo]);
        expect(readAgain).toStrictEqual([userDataOne, userDataTwo]);
        expect(userConverterCounter.read.count).toBe(4);
      });
    });
    describe("by loader", () => {
      it("after findOne read doc from firestore, findOne should read doc from loader cache", async () => {
        const userData = UserData.of();
        await users.ref().doc("1").set(userData);

        const readFirst = await users.findOne((ref) => ref().doc("1"));
        const readAgain = await users.findOne((ref) => ref().doc("1"));

        expect(readFirst).toStrictEqual({ id: "1", ...userData });
        expect(readAgain).toStrictEqual({ id: "1", ...userData });
        expect(userConverterCounter.read.count).toBe(1);
      });

      it("after findMany read docs from firestore, findOne should read doc from loader cache", async () => {
        const userDataOne = UserData.of({
          createdAt: admin.firestore.Timestamp.fromDate(new Date("2000-01-01")),
          updatedAt: admin.firestore.Timestamp.fromDate(new Date("2000-01-01")),
        });
        const userDataTwo = UserData.of({
          createdAt: admin.firestore.Timestamp.fromDate(new Date("2020-01-01")),
          updatedAt: admin.firestore.Timestamp.fromDate(new Date("2020-01-01")),
        });
        await users.ref().doc("1").set(userDataOne);
        await users.ref().doc("2").set(userDataTwo);

        const readByFindMany = await users.findMany((ref) => ref().orderBy("createdAt", "asc"));
        const readByFindOne = await Promise.all(["1", "2"].map((id) => users.findOne((ref) => ref().doc(id))));

        expect(readByFindMany).toStrictEqual([
          { id: "1", ...userDataOne },
          { id: "2", ...userDataTwo },
        ]);
        expect(readByFindOne).toStrictEqual([
          { id: "1", ...userDataOne },
          { id: "2", ...userDataTwo },
        ]);
        expect(userConverterCounter.read.count).toBe(2);
      });
    });
  });

  describe("cache", () => {
    describe("by findOne", () => {
      it("if no ttl set, findOne should read doc from firestore", async () => {
        initializeDataSource();
        const userData = UserData.of();
        await users.ref().doc("1").set(userData);

        initializeDataSource();
        const readFirst = await users.findOne((ref) => ref().doc("1"));

        initializeDataSource(users.cache, userConverterCounter);
        const readAgain = await users.findOne((ref) => ref().doc("1"));

        expect(readFirst).toStrictEqual({ id: "1", ...userData });
        expect(readAgain).toStrictEqual({ id: "1", ...userData });
        expect(userConverterCounter.read.count).toBe(2);
      });

      it("if ttl set, findOne should read doc from cache", async () => {
        initializeDataSource();
        const userData = UserData.of();
        await users.ref().doc("1").set(userData);

        initializeDataSource();
        const readFirst = await users.findOne((ref) => ref().doc("1"), { ttlInSeconds: 60 });

        initializeDataSource(users.cache, userConverterCounter);
        const readAgain = await users.findOne((ref) => ref().doc("1"), { ttlInSeconds: 60 });

        expect(readFirst).toStrictEqual({ id: "1", ...userData });
        expect(readAgain).toStrictEqual({ id: "1", ...userData });
        expect(userConverterCounter.read.count).toBe(1);
      });
    });

    describe("by findMany", () => {
      it("if ttl no set, findOne should read doc from firestore", async () => {
        initializeDataSource();
        const userDataOne = UserData.of({
          createdAt: admin.firestore.Timestamp.fromDate(new Date("2000-01-01")),
          updatedAt: admin.firestore.Timestamp.fromDate(new Date("2000-01-01")),
        });
        const userDataTwo = UserData.of({
          createdAt: admin.firestore.Timestamp.fromDate(new Date("2020-01-01")),
          updatedAt: admin.firestore.Timestamp.fromDate(new Date("2020-01-01")),
        });
        await users.ref().doc("1").set(userDataOne);
        await users.ref().doc("2").set(userDataTwo);

        initializeDataSource();
        const readByFindMany = await users.findMany((ref) => ref().orderBy("createdAt", "asc"));

        initializeDataSource(users.cache, userConverterCounter);
        const readByFindOne = await Promise.all(["1", "2"].map((id) => users.findOne((ref) => ref().doc(id))));

        expect(readByFindMany).toStrictEqual([
          { id: "1", ...userDataOne },
          { id: "2", ...userDataTwo },
        ]);
        expect(readByFindOne).toStrictEqual([
          { id: "1", ...userDataOne },
          { id: "2", ...userDataTwo },
        ]);
        expect(userConverterCounter.read.count).toBe(4);
      });

      it("if ttl set, findOne should read doc from cache", async () => {
        initializeDataSource();
        const userDataOne = UserData.of({
          createdAt: admin.firestore.Timestamp.fromDate(new Date("2000-01-01")),
          updatedAt: admin.firestore.Timestamp.fromDate(new Date("2000-01-01")),
        });
        const userDataTwo = UserData.of({
          createdAt: admin.firestore.Timestamp.fromDate(new Date("2020-01-01")),
          updatedAt: admin.firestore.Timestamp.fromDate(new Date("2020-01-01")),
        });
        await users.ref().doc("1").set(userDataOne);
        await users.ref().doc("2").set(userDataTwo);

        initializeDataSource();
        const readByFindMany = await users.findMany((ref) => ref().orderBy("createdAt", "asc"), { ttlInSeconds: 60 });

        initializeDataSource(users.cache, userConverterCounter);
        const readByFindOne = await Promise.all(
          ["1", "2"].map((id) => users.findOne((ref) => ref().doc(id), { ttlInSeconds: 60 }))
        );

        expect(readByFindMany).toStrictEqual([
          { id: "1", ...userDataOne },
          { id: "2", ...userDataTwo },
        ]);
        expect(readByFindOne).toStrictEqual([
          { id: "1", ...userDataOne },
          { id: "2", ...userDataTwo },
        ]);
        expect(userConverterCounter.read.count).toBe(2);
      });
    });
  });
});
