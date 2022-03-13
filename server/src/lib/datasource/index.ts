import { getDb } from "../../firebase-app";
import { IUserData } from "../entity/user";
import { ServerContext } from "./../../context";
import { ITopicData } from "./../entity/topic";
import { Converter } from "./converter";
import { FirestoreDataSource } from "./firestore-datasource";

const db = getDb();

export const usersRef = () => db.collection("users").withConverter(Converter<IUserData>());
export class Users extends FirestoreDataSource<IUserData, void, ServerContext> {}

export const topicsRef = () => db.collection("topics").withConverter(Converter<ITopicData>());
export class Topics extends FirestoreDataSource<ITopicData, void, ServerContext> {}

export type DataSources = {
  users: Users;
  topics: Topics;
};

export const dataSources = () => {
  return {
    users: new FirestoreDataSource(usersRef),
    topics: new FirestoreDataSource(topicsRef),
  };
};
