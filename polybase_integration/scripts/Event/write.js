import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import "dotenv/config";

const db = new Polybase({
  defaultNamespace: process.env.NAMESPACE,
});

db.signer((data) => {
    return {
      h: 'eth-personal-sign',
      sig: ethPersonalSign(process.env.PRIVATEKEY, data)
    }
  });

await db
  .collection("Event")
  .record("event001")
  .call("addTag", [db.collection("Tag").record("dao")]);
