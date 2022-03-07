import { getDb } from "../../firebase-app";
import { IUser } from "../entity/user";
import { FirestoreDataSource } from "./firestore-datasource";
import { Converter } from "./firestore-datasource/helper";

const db = getDb();

export const usersRef = db.collection("users").withConverter(Converter<IUser>());

export class Users extends FirestoreDataSource<IUser> {}

export const dataSources = () => {
  console.log("--- dataSources initialized ---");
  return {
    users: new Users(usersRef),
  };
};
