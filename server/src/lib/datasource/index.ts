import { getDb } from "../../firebase-app";
import { IUser } from "../entity/user";
import { Converter } from "./converter";
import { FirestoreDataSource } from "./firestore-datasource";

const db = getDb();

export const usersRef = () => db.collection("users").withConverter(Converter<IUser>());

export const dataSources = () => {
  console.log("--- dataSources initialized ---");
  return {
    users: new FirestoreDataSource(usersRef),
  };
};
