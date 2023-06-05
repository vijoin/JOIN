import { Polybase } from "@polybase/client";
import 'dotenv/config';

const db = new Polybase({
    defaultNamespace: process.env.NAMESPACE,
});

const { data } = await db.collection("Tag").record("dao").get();

console.log("Tag id:", data.id);
console.log("Tag name:", data.name);