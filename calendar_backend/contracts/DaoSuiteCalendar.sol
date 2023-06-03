// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DaoSuiteCalendar is Ownable {
    struct Calendar {
        address owner;
        string name;
        string[] tags;
        string state; // [Draft | Active | Paused | Archive]
    }

    struct Event {
        string author;
        string name;
        string description;
        string platform;
        string link;
        string[] tags;
        uint start_date;
        uint end_date;
        uint calendarId;
    }

    struct eventSubscriberReminder{
        address subscriber;
        uint eventId;
    }

    type Year is uint;
    type Month is uint;
    type Day is uint;
    type Hour is uint;
    type Minute is uint;

    mapping(uint => Calendar) s_calendars;
    mapping(uint => Event) s_event;

    mapping(Year => mapping(Month => mapping(Day => mapping(Hour => mapping(Minute => eventSubscriberReminder[]))))) s_scheduledEventReminders;

    constructor() {}

    function createCalendar() public {}

    function createEvent() public {}

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
    ) public returns (eventSubscriberReminder[] memory _eventSubscribersRemiders) {}
}
