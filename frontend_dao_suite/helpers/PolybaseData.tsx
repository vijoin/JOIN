import { Polybase } from "@polybase/client";
const db = new Polybase({
    defaultNamespace: process.env.NEXT_PUBLIC_NAMESPACE,
});

export const FetchKeyCollection = async (collection: string, record: string) => {
  try {
    const { data } = await db.collection(collection).record(record).get();
    const response = {
      data : data,
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
}
export const FetchCollection = async (collection: string) => {
  try {
    const {data} = await db.collection(collection).get();
    const response = {
      data : data,
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
}
export const CreateTag = async(id: string, name: string) => {
  try {
    
  } catch (error) {
    
  }
}
