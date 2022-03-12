import { getDb } from "../../firebase-app";
import { IUserData } from "../entity/user";
import { ServerContext } from "./../../context";
import { Converter } from "./converter";
import { FirestoreDataSource } from "./firestore-datasource";

const db = getDb();

export const usersRef = () => db.collection("users").withConverter(Converter<IUserData>());
export class Users extends FirestoreDataSource<IUserData, void, ServerContext> {}

export type DataSources = {
  users: Users;
};

export const dataSources = () => {
  return {
    users: new FirestoreDataSource(usersRef),
  };
};
