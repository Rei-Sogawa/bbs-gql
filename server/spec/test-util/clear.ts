import request from "request";

import { FIREBASE_AUTH_EMULATOR_HOST, FIRESTORE_EMULATOR_HOST, PROJECT_ID } from "./env-constants";
import { sleep } from "./sleep";

export const clearFirestore = async () => {
  await request({
    url: `http://${FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}/databases/(default)/documents`,
    method: "DELETE",
  });
  await sleep(1_000);
};

export const clearAuth = async () => {
  await request({
    url: `http://${FIREBASE_AUTH_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}/accounts`,
    method: "DELETE",
  });
  await sleep(1_000);
};
