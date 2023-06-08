import { Polybase } from "@polybase/client";
import 'dotenv/config'; 

const db = new Polybase({
    defaultNamespace: process.env.NAMESPACE,
});

const { data } = await db.collection("ReminderEventSubscriber")
    .record("reminder-01").get();

console.log("Reminder id:", data.id);
console.log("Reminder event:", data.event);
console.log("Reminder timestamp:", data.timestamp);