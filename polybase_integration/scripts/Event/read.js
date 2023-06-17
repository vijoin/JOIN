import { Polybase } from "@polybase/client";
import moment from "moment";
import "dotenv/config";

const db = new Polybase({
  defaultNamespace: process.env.NAMESPACE,
});

const { data } = await db.collection("Event").record("event006").get();

const calendar = await (async (id) => {
  return (await db.collection("Calendar").record(id).get()).data;
})(data.calendar.id);

console.log("Event id:", data.id);
console.log("Event name:", data.name);
console.log("Event Owner:", calendar.owner);
console.log("Event calendar name:", calendar.name);
console.log(
  "Event create date:",
  moment.unix(data.create_date_timestamp).format("YYYY-MM-DDTHH:MM:SSZ")
);
console.log(
  "Event start date:",
  moment.unix(data.start_date_timestamp).format("YYYY-MM-DDTHH:MM:SSZ")
);
console.log(
  "Event end date:",
  moment.unix(data.end_date_timestamp).format("YYYY-MM-DDTHH:MM:SSZ")
);
