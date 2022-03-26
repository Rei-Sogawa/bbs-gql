// import { getAuth, getDb } from "test-util/setup";
import { signUp } from "@src/core/usecase/mutation/signUp";

import { clearAuth, clearFirestore } from "../../test-util/clear";
// import { createCollections } from "@/fire/createCollections";
// import { decodeTimestamp } from "@/fire/lib/helper";

describe("signUp", () => {
  it("trivial", () => {
    console.log(clearAuth, clearFirestore);
    console.log(signUp);
  });
});
