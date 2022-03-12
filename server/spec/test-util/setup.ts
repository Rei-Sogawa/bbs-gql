import * as admin from "firebase-admin";

import { FIREBASE_AUTH_EMULATOR_HOST, FIRESTORE_EMULATOR_HOST, PROJECT_ID } from "../test-util/env-constants";

process.env.GCLOUD_PROJECT = PROJECT_ID;
process.env.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_EMULATOR_HOST;

admin.initializeApp();
export const getDb = () => admin.firestore();
export const getAuth = () => admin.auth();
