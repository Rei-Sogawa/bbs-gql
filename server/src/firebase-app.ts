import * as admin from "firebase-admin";

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
