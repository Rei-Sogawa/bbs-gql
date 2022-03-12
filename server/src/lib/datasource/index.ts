import { getDb } from "../../firebase-app";
import { IUserData } from "../entity/user";
import { Converter } from "./converter";
import { FirestoreDataSource } from "./firestore-datasource";

const db = getDb();

export const usersRef = () => db.collection("users").withConverter(Converter<IUserData>());
export class Users extends FirestoreDataSource<IUserData, void, any> {}

export const dataSources = () => {
  console.log("--- dataSources initialized ---");
  return {
    users: new FirestoreDataSource(usersRef),
  };
};
