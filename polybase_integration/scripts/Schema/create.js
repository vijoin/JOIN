import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth';
import 'dotenv/config';

const db = new Polybase({
  defaultNamespace: process.env.NAMESPACE,
});

db.signer((data) => {
  return {
    h: 'eth-personal-sign',
    sig: ethPersonalSign(process.env.PRIVATEKEY, data)
  }
});

await db.applySchema(`
@public
collection Tag {
  id: string;
  name: string;

  constructor (id: string, name:string) {
    this.id = id;
    this.name = name;
  }
}

@public
collection Calendar {
  // "id" is unique and required on all collections
  id: string;

  // We will use a public key to authenticate function
  // calls later
  owner: PublicKey;
  
  name: string; 

  // An optional property denoted with ?
  tags?: Tag[]; 

  state: string;

  // "constructor" is called when a new record is
  // created, make sure to assign a value to "this.id"
  constructor (id: string, name: string) {
    // "this.id" must be assigned in the constructor
    // "this.id" must be unique in collection
    this.id = id;
    this.name = name;
    this.state = 'Draft';
    this.tags = [];
    
    // You can assign the publicKey of the user who is
    // creating the record, this can then be used to
    // control permissions for the record (see below)
    this.owner = ctx.publicKey;
  }

  // You can add your own functions to determine rules
  // on who can update the records data
  function setName (name: string) {
    // Check if the caller is the original creator of the record.
    if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.name = name;
  }

  function setState (state: string) {
    this.state = state;
  }

  function addTag (tag: string) {
    this.tags.push(tag);
  }
}

@public
collection Event {
  id: string;
  calendar: Calendar;
  name: string;
  description: string;
  platform: string;
  url: string;
  start_date_timestamp: number;
  end_date_timestamp: number;
  state: string;
  tags?: Tag[];

  @index(calendar);

  constructor (
    id: string,
    calendar: Calendar,
    name: string,
    description: string,
    platform: string,
    url: string,
    start_date_timestamp: number,
    end_date_timestamp: number
  ) {
    this.id = id;
    this.calendar = calendar;
    this.name = name;
    this.description = description;
    this.platform = platform;
    this.url = url;
    this.start_date_timestamp = start_date_timestamp;
    this.end_date_timestamp = end_date_timestamp;
    this.state = 'Draft';
    this.tags = [];
  }

  function addTag (tag: Tag) {
    this.tags.push(tag);
  }
}

@public
collection ReminderEventSubscriber {
    id: string;
    subscriber: PublicKey;
    event: Event;
    timestamp: number;

    constructor (id: string, event: Event, timestamp: number) {
        this.id = id;
        this.subscriber = ctx.publicKey;
        this.event = event;
        this.timestamp = timestamp;
    }

}

@public
collection User {
  id: string; 
  name?: string;
  bio?: string;
  avatar?: string;
  pvkey: string;
  $publicKey: string;
  
  constructor (id: string, pvkey: string) {
    this.id = id;
    this.$publicKey = ctx.publicKey.toHex();
    this.pvkey = pvkey;
  }

  setProfile(name?: string, bio?: string, avatar?: string) {
    if (this.$publicKey != ctx.publicKey.toHex()) {
      throw error ('invalid owner');
    }
    if (this.name) {
      this.name = name;
    }
    if (this.bio) {
      this.bio = bio;
    }
    if (this.avatar) {
      this.avatar = avatar;
    }
  }
}

`,)