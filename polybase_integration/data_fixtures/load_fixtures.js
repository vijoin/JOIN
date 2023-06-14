import { readFileSync } from "fs";
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";

import "dotenv/config";

const db = new Polybase({
  defaultNamespace: process.env.NAMESPACE,
});

db.signer((data) => {
  return {
    h: "eth-personal-sign",
    sig: ethPersonalSign(process.env.PRIVATEKEY, data),
  };
});

const getFixtureData = (collectionPath) => {
  let collectionData = readFileSync(collectionPath, "utf-8");
  return JSON.parse(collectionData);
};

const loadFixtureData = (records, collectionName) => {
  records.forEach(async (record) => {
    await db.collection(collectionName).create(Object.values(record));
  });
};

const tags = getFixtureData(
  "/home/vijoin/Documents/Learning_Web3/DAOSuite/polybase_integration/data_fixtures/tags.json"
);
// const calendars = getFixtureData("/home/vijoin/Documents/Learning_Web3/DAOSuite/polybase_integration/data_fixtures/calendar.json")
// const events = getFixtureData("/home/vijoin/Documents/Learning_Web3/DAOSuite/polybase_integration/data_fixtures/event.json")

loadFixtureData(tags, "Tag");
