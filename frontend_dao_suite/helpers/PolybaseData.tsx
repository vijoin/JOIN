import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import { EventData, Tag } from "../types/types";
import { useCollection } from "@polybase/react";
import { CollectionRecordResponse } from "@polybase/client/dist/Record";

const auth = typeof window !== "undefined" ? new Auth() : null;
const db = new Polybase({
  defaultNamespace: process.env.NEXT_PUBLIC_NAMESPACE,
});
export enum Platform {
  Twitter = "Twitter",
  Twitch = "Twitch",
  Youtube = "Youtube",
  Discord = "Discord",
  Physical = "Physical",
}
db.signer(async (data) => {
  if (!auth) return null;
  return {
    h: "eth-personal-sign",
    sig: await auth.ethPersonalSign(data),
  };
});
//Fetch Data
export const FetchKeyCollection = async (
  collection: string,
  record: string
) => {
  try {
    const { data } = await db.collection(collection).record(record).get();
    const response = {
      data: data,
      error: null,
    };
    return response;
  } catch (error) {
    const response = {
      data: null,
      error: error,
    };
    return response;
  }
};
export const FetchCollection = async (collection: string) => {
  try {
    const { data } = await db
      .collection(collection)
      .sort('start_date_timestamp', 'asc')
      .get();
    const response = {
      data: data,
      error: null,
    };
    return response;
  } catch (error) {
    const response = {
      data: null,
      error: error,
    };
    return response;
  }
};
//Filtering Data
export async function ShowAllEventsFromToday(
  startDate: number,
) {
  try {
    const {data} = await db
      .collection("Event")
      .where("start_date_timestamp", ">", startDate)
      .sort('start_date_timestamp', 'asc')
      .get();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error filtering events: ${error}`);
  }
}
export async function FilterEventsBetweenDates(
  startDate: number,
  endDate: number
) {
  try {
    const {data} = await db
      .collection("Event")
      .where("start_date_timestamp", ">", startDate)
      .where("start_date_timestamp", "<", endDate)
      .sort('start_date_timestamp', 'asc')
      .get();
    return data;
  } catch (error) {
    throw new Error(`Error filtering events: ${error}`);
  }
}
//Tags
export const CreateTag = async (id: string, name: string) => {
  try {
  } catch (error) {}
};
export const ReadTagsFromEvent = async (eventId : string) => {
  try {
    const response =  db
      .collection("EventTagRel")
      .where("event", '==', db.collection("Event").record(eventId))
      .get()
    return response;
  } catch (error) {
    throw new Error(`Error reading tags: ${error}`);
  }
}
export const FetchTagData = async (tagId : string) => {
  try {
    const { data } = await db.collection("Tag").record(tagId).get();
    return data.name;
  } catch (error) {
    throw new Error(`Error reading specific tag info: ${error}`);
  }
}
//Events
export const CreateEvent = async (
  id: string,
  calendar: string,
  name: string,
  desc: string,
  image: string,
  location: string,
  platform: string,
  url: string,
  is_online: boolean,
  dateStart: number,
  dateEnd: number,
  createDate: number,
  tags: Tag[]
) => {
  try {
    const createEvent = await db
      .collection("Event")
      .create([
        id,
        db.collection("Calendar").record(calendar),
        name,
        desc,
        image,
        location,
        platform,
        url,
        is_online,
        dateStart,
        dateEnd,
        [
          db.collection("Tag").record("dao"),
          db.collection("Tag").record("defi"),
        ],
        createDate,
      ]);
    const response = {
      data: createEvent,
      error: null,
    };
    return response;
  } catch (error) {
    console.log(error);
    const response = {
      data: null,
      error: error,
    };
    return response;
  }
};
export const AddTagOnEvent = async (record: string, tag: Tag) => {
  try {
    const write = await db
      .collection("Event")
      .record(record)
      .call("addTag", [db.collection("Tag").record("dao")]);

    console.log(write);
    return write;
  } catch (error) {
    console.log(error);
    return error;
  }
};
//Users
export const CreateUser = async (id: string, pvkey: string) => {
  try {
    const createUser = await db.collection("User").create([id, pvkey]);
    return createUser;
  } catch (error) {
    console.log(error);
  }
};
