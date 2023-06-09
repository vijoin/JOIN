import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import { getAccount } from "@wagmi/core";
import { signMessage } from "@wagmi/core";
import * as eth from "@polybase/eth";

const auth = typeof window !== "undefined" ? new Auth() : null;
const db = new Polybase({
  defaultNamespace: process.env.NEXT_PUBLIC_NAMESPACE,
});

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
