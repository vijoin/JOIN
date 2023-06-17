import { ToadScheduler, SimpleIntervalJob, Task } from "toad-scheduler";
import { Polybase } from "@polybase/client";
import moment from "moment";
import "dotenv/config";
import { ethers } from "ethers";

import * as PushAPI from "@pushprotocol/restapi";

const PK = process.env.PROD_PRIVATEKEY;
// const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(PK);

const db = new Polybase({
  defaultNamespace: process.env.NAMESPACE,
});

const scheduler = new ToadScheduler();

const getReminders = async (currentTimestamp) => {
  const { data } = await db
    .collection("ReminderEventSubscriber")
    // .where("state", "==", 'pending') // NOT WORKING
    .where("timestamp", "<", currentTimestamp)
    .sort("timestamp", "asc")
    .get();
  return data;
};

// const tmpData = await getReminders(moment(Date.now()).unix());

const sendNotification = async (reminder) => {
  // const sendNotification = async (reminder) => {
  console.log("Sending notification...");

  const { id, event, subscriber } = reminder;

  try {
    const { data } = await db.collection("Event").record(event.id).get();

    const eventDate = moment
      .unix(data.start_date_timestamp)
      .format("MM/DD/YYYY");
    const eventTime = moment
      .unix(data.start_date_timestamp)
      .format("HH:MM:SS (Z)");

    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `${data.name} is happening soon!}`,
        body: `${data.name} is happening on ${eventDate} at ${eventTime}`,
      },
      payload: {
        title: `${data.name} is happening on ${eventDate} at ${eventTime}`,
        body: `About the event:<br/>Description: ${data.description} <br/>Platform: ${data.platform} <br/>URL: ${data.url} <br>More Details: JOIN-URL`,
        cta: data.url,
        img: `https://ipfs.io/ipfs/${data.image}`,
      },
      recipients: `eip155:5:${subscriber}`, // recipient address
      channel: "eip155:5:0xEE1E1703173cE5eC3cFe8a23Cb495E834296CeEa", // your channel address
      env: "staging",
    });

    if (apiResponse?.status === 204) {
      await db
        .collection("ReminderEventSubscriber")
        .record(id)
        // .call("setSent", []); // use this when filter starts working
        .call("del", []);
      console.log("Sent successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};

// const reminders = await getReminders(moment(Date.now()).unix());
// for (const reminder of reminders) {
//   await sendNotification(reminder.data);
// }

const task = new Task("simple task", async () => {
  const reminders = await getReminders(moment(Date.now()).unix());

  if (reminders.length === 0) {
    console.log("No reminders found!")
  } else {
    for (const reminder of reminders) {
      await sendNotification(reminder.data);
    }
  }

});
const job = new SimpleIntervalJob({ minutes: 5 }, task);

scheduler.addSimpleIntervalJob(job);

// NEW TEST

// const reminderTask = new Task("simple reminder Task", async () => {
//   sendNotification({event: "X", subscriber: "Y"});
// });

// const reminderJob = new SimpleIntervalJob({ minutes: 1}, reminderTask);
// scheduler.addSimpleIntervalJob(reminderJob);
