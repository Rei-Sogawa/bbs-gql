import { createCollections } from "@/fire/createCollections";

import { clearFirestore } from "./test-util/clear";
import { clearAuth } from "./test-util/clear";
import { getAuth, getDb } from "./test-util/setup";

const auth = getAuth();
const db = getDb();

const { usersCollection, topicsCollection } = createCollections(db);

const main = async () => {
  await Promise.all([clearAuth(), clearFirestore()]);

  const authUsers = await Promise.all(
    Array.from({ length: 20 }).map((_, idx) =>
      auth.createUser({ email: `user-${idx}@example.com`, password: "password" })
    )
  );

  console.log(db, authUsers);
  console.log(usersCollection, topicsCollection);
};

main();
