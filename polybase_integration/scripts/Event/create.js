import { Polybase } from "@polybase/client";
import moment from "moment";
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
  })

await db.collection("Event").create([
  "event001", // event id
  db.collection("Calendar").record("calendar001"), // relation to record calendar DAO Suite Events
  "Kick-off", // name
  "Inaugural event for the platform DAO Suite", // description
  "Twitch", // platform
  "https://twitch.com/daosuite", // url
  moment("2023-06-01T10:00:00Z").unix(), // start_date_timestamp
  moment("2023-06-01T12:00:00Z").unix(), // end_date_timestamp
]);

await db
  .collection("Event")
  .record("event001")
  .call("addTag", [db.collection("Tag").record("dao")]);
