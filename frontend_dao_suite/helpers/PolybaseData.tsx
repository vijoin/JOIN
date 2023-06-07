import { Polybase } from "@polybase/client";
const db = new Polybase({
    defaultNamespace: process.env.NEXT_PUBLIC_NAMESPACE,
});
type Fetch = {
  collection: string,
  record: string
}

export const FetchData = async ({collection, record}: Fetch) => {
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