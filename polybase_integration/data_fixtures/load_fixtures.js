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

const loadFixtureData = (records, collectionName, valuesCallback) => {
  records.forEach(async (record) => {
    await db.collection(collectionName).create(valuesCallback(record));
  });
  return true;
};

// RECOMMENDATION
// UNCOMMENT ONE SECTION AT A TIME. POLYBASE THROWS FALSE ERRORS

// SECTION: TAGS
// const tags = getFixtureData(
//   "/home/vijoin/Documents/Learning_Web3/DAOSuite/polybase_integration/data_fixtures/tags.json"
// );

// const tagsCallback = (record) => {
//   return Object.values(record);
// };

// loadFixtureData(tags, "Tag", tagsCallback);

// SECTION: COMMUNITIES
// const communities = getFixtureData(
//   "/home/vijoin/Documents/Learning_Web3/DAOSuite/polybase_integration/data_fixtures/community.json"
// );

// const communitiesCallback = (record) => {
//   return Object.values(record);
// };

// loadFixtureData(communities, "Community", communitiesCallback);

// SECTION: CALENDARS
// const calendars = getFixtureData(
//   "/home/vijoin/Documents/Learning_Web3/DAOSuite/polybase_integration/data_fixtures/calendar.json"
// );

// const calendarCallback = (record) => {
//   return Object.values(record);
// };

// loadFixtureData(calendars, "Calendar", calendarCallback);

// SECTION: EVENTS
// const events = getFixtureData(
//   "/home/vijoin/Documents/Learning_Web3/DAOSuite/polybase_integration/data_fixtures/event.json"
// );

// const eventCallback = ({
//   id,
//   calendar,
//   name,
//   description,
//   image,
//   location,
//   platform,
//   language,
//   url,
//   is_online,
//   start_date_timestamp,
//   end_date_timestamp,
//   created_timestamp,
// }) => {
//   return [
//     id,
//     db.collection("Calendar").record(calendar),
//     name,
//     description,
//     image,
//     location,
//     platform,
//     language,
//     url,
//     is_online,
//     start_date_timestamp,
//     end_date_timestamp,
//     created_timestamp,
//   ];
// };

// loadFixtureData(events, "Event", eventCallback);

// SECTION: EVENT TAGS
// const eventTags = getFixtureData(
//   "/home/vijoin/Documents/Learning_Web3/DAOSuite/polybase_integration/data_fixtures/event_tag_rel.json"
// );

// const eventTagsCallback = ({ id, event, tag }) => {
//   return [
//     id,
//     db.collection("Event").record(event),
//     db.collection("Tag").record(tag),
//   ];
// };

// loadFixtureData(eventTags, "EventTagRel", eventTagsCallback);

// SECTION: EVENT COMMUNITIES
// const eventCommunities = getFixtureData(
//   "/home/vijoin/Documents/Learning_Web3/DAOSuite/polybase_integration/data_fixtures/event_community_rel.json"
// );

// const eventCommunitiesCallback = ({ id, event, community }) => {
//   return [
//     id,
//     db.collection("Event").record(event),
//     db.collection("Community").record(community),
//   ];
// };

// loadFixtureData(
//   eventCommunities,
//   "EventCommunityRel",
//   eventCommunitiesCallback
// );
