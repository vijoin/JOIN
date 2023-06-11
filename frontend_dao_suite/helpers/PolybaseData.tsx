import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import { getAccount } from "@wagmi/core";
import { signMessage } from "@wagmi/core";
import * as eth from "@polybase/eth";
export type ItemData = {
  id: string;
  calendar: CalendarData;
  name: string;
  description: string;
  image: string;
  location: string;
  platform: string;
  url: string;
  is_online: boolean;
  end_date_timestamp: number;
  start_date_timestamp: number;
  state: string;
  tags: Tag[];
};
export type CalendarData = {
  collectionId: string;
  id: string;
};
export type Tag = {
  id: string;
  name: string;
};
export type EventResponse = {
  data : any;
  error : any;
}
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

export const CreateUser = async (id: string, pvkey: string) => {
  try {
    const createUser = await db.collection("User").create([id, pvkey]);
    return createUser;
  } catch (error) {
    console.log(error);
  }
};
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
    const { data } = await db.collection(collection).get();
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
export const CreateTag = async (id: string, name: string) => {
  try {
  } catch (error) {}
};
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
  tags?: Tag[]
) => {
  try {
    const createEvent = await db.collection("Event").create([
      id, // event id
      db.collection("Calendar").record(calendar), // relation to record calendar DAO Suite Events
      name, // name
      desc, // description
      image,
      location,
      platform, // platform
      url, // url
      is_online,
      dateStart, // start_date_timestamp
      dateEnd, // end_date_timestamp
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
