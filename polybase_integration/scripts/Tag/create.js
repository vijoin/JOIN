import { Polybase } from "@polybase/client";
import 'dotenv/config';

const db = new Polybase({
  defaultNamespace: process.env.NAMESPACE,
});

await db.collection("Tag").create(["nft", "NFT"]);

