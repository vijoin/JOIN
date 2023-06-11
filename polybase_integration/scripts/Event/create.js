import { Polybase } from "@polybase/client";
import moment from "moment";
import { ethPersonalSign } from '@polybase/eth';
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

await db.collection("Event").create([
  "event006", // event id
  db.collection("Calendar").record("calendar001"), // relation to record calendar DAO Suite Events
  "Learn how to create an event in JOIN Calendar", // name
  "Learn how to create an event in JOIN Calendar", // description
  "QmR8h1s4cyNJELt1MBeyVJUgArDLNvseeiXAwtLicWDQvg", //ipfs_hash
  "Bogotá", // Internet or City
  "Youtube", // platform
  "https://youtube.com/join", // url
  true, // is_online
  moment("2023-06-08T10:00:00Z").unix(), // start_date_timestamp
  moment("2023-06-08T12:00:00Z").unix(), // end_date_timestamp
  [db.collection("Tag").record("dao"), db.collection("Tag").record("nft")], // Tags
  // [], (empty array) also Tags
  //, (empty value) also Tags
  moment(Date.now()).unix(),
]);

// Also Tags, one at a time
// await db
//   .collection("Event")
//   .record("event001")
//   .call("addTag", [db.collection("Tag").record("dao")]);
