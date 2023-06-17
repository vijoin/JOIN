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

await db.applySchema(`
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


@public
collection Calendar {
  id: string;
  owner: User;
  name: string; 
  state: string;
  is_private: boolean;

  constructor (id: string, owner: User, name: string, is_private: boolean) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.is_private = is_private;
    this.state = 'Draft';
  }
}

@public
collection Event {
  id: string;
  calendar: Calendar;
  name: string;
  description: string;
  image?: string;
  location: string;
  platform: string;
  language: string;
  url: string;
  start_date_timestamp: number;
  end_date_timestamp: number;
  is_online: boolean;
  state: string;
  create_date_timestamp: number;

  @index(calendar);

  constructor (
    id: string,
    calendar: Calendar,
    name: string,
    description: string,
    image: string,
    location: string,
    platform: string,
    language: string,
    url: string,
    is_online: boolean,
    start_date_timestamp: number,
    end_date_timestamp: number,
    create_date_timestamp: number
  ) {
    this.id = id;
    this.calendar = calendar;
    this.name = name;
    this.description = description;
    this.image = image;
    this.location = location;
    this.platform = platform;
    this.language = language;
    this.url = url;
    this.start_date_timestamp = start_date_timestamp;
    this.end_date_timestamp = end_date_timestamp;
    this.is_online = is_online;
    this.state = 'Draft';
    this.create_date_timestamp = create_date_timestamp;    
  }

  function setState (state: string) {
    this.state = state;
  }
}

// This collection stores all the scheduled events in
// in user's private Calendar a.k.a My Calendar
@public
collection ScheduledCalendarEvent {
  id: string;
  user: User;
  event: Event;

  constructor (id: string, user: User, event: Event) {
    this.id = id;
    this.user = user;
    this.event = event;
  }

  del () {
      selfdestruct();
    }
}

@public
collection ReminderEventSubscriber {
    id: string;
    subscriber: string;
    event: Event;
    timestamp: number;
    state: string;

    @index(state, timestamp);


    constructor (id: string, subscriber: string, event: Event, timestamp: number) {
        this.id = id;
        this.subscriber = subscriber;
        this.event = event;
        this.timestamp = timestamp;
        this.state = 'pending';
    }

    setSent () {
      this.state = 'sent';
    }

    del () {
      selfdestruct();
    }

    del () {
      selfdestruct();
    }

}

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
collection EventTagRel {
  id: string;
  event: Event;
  tag: Tag;

  @index(event, tag);

  constructor (id: string, event: Event, tag: Tag) {
    this.id = id;
    this.event = event;
    this.tag = tag;
  }
}

@public
collection Community {
  id: string;
  name: string;
  url?: string;

  constructor (id: string, name: string, url?: string) {
    this.id = id;
    this.name = name;

    if (url) {
      this.url = url;
    }
  }
}

@public
collection EventCommunityRel {
  id: string;
  event: Event;
  community: Community;

  constructor (id: string, event: Event, community: Community) {
    this.id = id;
    this.event = event;
    this.community = community;
  }
}

`);
