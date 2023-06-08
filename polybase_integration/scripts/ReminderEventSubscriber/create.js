import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';
import moment from "moment";

const db = new Polybase({
  defaultNamespace: process.env.NAMESPACE,
});

db.signer((data) => {
  return {
    h: 'eth-personal-sign',
    sig: ethPersonalSign(process.env.PRIVATEKEY, data)
  }
});

await db.collection("ReminderEventSubscriber").create([
    "reminder-01", // Reminder id
    db.collection("Event").record("event001"), // Event
    moment("2023-06-01T10:00:00Z").unix(), //timestamp reminder
])