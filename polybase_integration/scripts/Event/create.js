import { Polybase } from "@polybase/client";
import moment from "moment";
import { ethPersonalSign } from "@polybase/eth";
import "dotenv/config";

const db = new Polybase({
  defaultNamespace: process.env.NAMESPACE,
});

// signer not required for Events
// db.signer((data) => {
//     return {
//       h: 'eth-personal-sign',
//       sig: ethPersonalSign(process.env.PRIVATEKEY, data)
//     }
//   })

const eventId = "event008";

await db.collection("Event").create([
  eventId, // event id
  db.collection("Calendar").record("calendar002"), // relation to record calendar DAO Suite Events
  "Learn how to create an event in JOIN Calendar", // name
  "Learn how to create an event in JOIN Calendar", // description
  "QmR8h1s4cyNJELt1MBeyVJUgArDLNvseeiXAwtLicWDQvg", //ipfs_hash
  "Bogotá", // location: Internet or City
  "Youtube", // platform
  "https://youtube.com/join", // url
  true, // is_online
  moment("2023-06-08T10:00:00Z").unix(), // start_date_timestamp
  moment("2023-06-08T12:00:00Z").unix(), // end_date_timestamp
  moment(Date.now()).unix(),
]);

// Tags are added independently
await db
  .collection("EventTagRel")
  .create([
    "eventtag002",
    db.collection("Event").record(eventId),
    db.collection("Tag").record("dao"),
  ]);
