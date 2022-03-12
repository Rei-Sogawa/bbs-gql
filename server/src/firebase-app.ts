import * as admin from "firebase-admin";

import { FIREBASE_AUTH_EMULATOR_HOST, FIRESTORE_EMULATOR_HOST, PROJECT_ID } from "../spec/test-util/env-constants";

if (process.env.NODE_ENV !== "production") {
  process.env.GCLOUD_PROJECT = PROJECT_ID;
  process.env.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
  process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;
}

export function getAdmin() {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  } else {
    const app = admin.initializeApp();
    return app;
  }
}
export const getAuth = () => getAdmin().auth();
export const getDb = () => getAdmin().firestore();
