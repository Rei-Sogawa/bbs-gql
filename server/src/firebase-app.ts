import * as admin from "firebase-admin";

process.env.GCLOUD_PROJECT = "playground-67a20";
process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

const config = {};

export function getAdmin() {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  } else {
    const app = admin.initializeApp(config);
    return app;
  }
}
export const getAuth = () => getAdmin().auth();
export const getDb = () => getAdmin().firestore();
