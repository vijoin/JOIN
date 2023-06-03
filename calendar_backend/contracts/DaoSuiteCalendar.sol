// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DaoSuiteCalendar is Ownable {
    using Counters for Counters.Counter;

    struct Calendar {
        address owner;
        string name;
        string[] tags;
        string state; // [Draft | Active | Paused | Archive]
    }

    struct Event {
        address author;
        string name;
        string description;
        string platform;
        string link;
        string[] tags;
        uint start_date;
        uint end_date;
        string state; // [Draft | Active | Paused | Archive]
        uint calendarId;
    }

    struct eventSubscriberReminder {
        address subscriber;
        uint eventId;
    }

    type Year is uint;
    type Month is uint;
    type Day is uint;
    type Hour is uint;
    type Minute is uint;

    Counters.Counter s_calendarCounter;
    Counters.Counter s_eventCounter;

    mapping(uint => Calendar) s_calendars;
    mapping(uint => Event) s_events;

    mapping(Year => mapping(Month => mapping(Day => mapping(Hour => mapping(Minute => eventSubscriberReminder[]))))) s_scheduledEventReminders;

    event CalendarCreated(uint id, string name, string[] tags);
    event EventCreated(
        uint id,
        address indexed author,
        string name,
        string description,
        string platform,
        string url,
        string[] tags,
        uint start_date,
        uint end_date,
        uint indexed calendarId
    );

    constructor() {}

    function createCalendar(
        string calldata _name,
        string[] calldata _tags
    ) public returns (uint calendarId) {
        calendarId = s_calendarCounter.current();
        s_calendars[calendarId] = Calendar(msg.sender, _name, _tags, "Draft");

        emit CalendarCreated(calendarId, _name, _tags);
    }

    function createEvent(
        string memory _name,
        string memory _description,
        string memory _platform,
        string memory _url,
        string[] memory _tags,
        uint _start_date,
        uint _end_date,
        uint _calendarId
    ) public returns (uint eventId) {
        eventId = s_eventCounter.current();
        s_events[eventId] = Event(
            msg.sender,
            _name,
            _description,
            _platform,
            _url,
            _tags,
            _start_date,
            _end_date,
            "Draft",
            _calendarId
        );

        emit EventCreated(
            eventId,
            msg.sender,
            _name,
            _description,
            _platform,
            _url,
            _tags,
            _start_date,
            _end_date,
            _calendarId
        );
    }

    function scheduleEventReminder(
        Year _year,
        Month _month,
        Day _day,
        Hour _hour,
        Minute _minute,
        uint _eventId
    ) internal {}

    function getscheduledEventSubscriberReminders(
        Year _year,
        Month _month,
        Day _day,
        Hour _hour,
        Minute _minute
    )
        public
        returns (eventSubscriberReminder[] memory _eventSubscribersRemiders)
    {}
}
