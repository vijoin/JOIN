import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import moment from "moment";


describe("DaoSuiteCalendar", function () {
  async function deploymentFixture() {
    const [deployer] = await ethers.getSigners();

    const CalendarDaoSuite = await ethers.getContractFactory("DaoSuiteCalendar");
    const calendarDaoSuite = await CalendarDaoSuite.deploy();

    return { calendarDaoSuite, deployer };
  }

  async function calendarFixture() {
    const { calendarDaoSuite } = await loadFixture(deploymentFixture);

    const calendarName = "DAOSuite";
    const calendarTags = ["DAO", "Suite"]

    const calendarTxResponse = await calendarDaoSuite.createCalendar(calendarName, calendarTags);
    const calendarTxReceipt = await calendarTxResponse.wait(1);
    const calendarId = calendarTxReceipt.events[0].args.id;

    return { calendarDaoSuite, calendarId }

  }

  describe("Deployment", function () {
    it("Should set the deployer as Owner", async function () {
      const { calendarDaoSuite, deployer } = await loadFixture(deploymentFixture);

      expect(await calendarDaoSuite.owner()).to.equal(deployer.address);
    });

  })

  describe("Events", function () {
    it("Should create a calendar", async function () {
      const { calendarDaoSuite } = await loadFixture(deploymentFixture);

      const name = "DAOSuite";
      const tags = ["DAO", "Suite"]

      const txResponse = await calendarDaoSuite.createCalendar(name, tags);
      const txReceipt = await txResponse.wait(1);
      const calendarId = txReceipt.events[0].args.id;

      expect(txResponse).to.emit(calendarDaoSuite, "CalendarCreated").withArgs(calendarId, name, tags)
      expect(calendarId).to.equal(0)

    });

    it("Should create an event", async function () {
      const { calendarDaoSuite, calendarId } = await loadFixture(calendarFixture);

      const name = "Kick-off";
      const tags = ["DAO", "Suite", "Kickoff"]

      // string author
      const description = "Inaugural event to launch the comumunity of DAO Suite";
      const platform = "Youtube";
      const url = "https://www.youtube.com/testchannel"
      const start_date = moment("2023-06-01T10:00:00Z").unix();
      const end_date = moment("2023-06-01T12:00:00Z").unix();

      const txResponse = await calendarDaoSuite.createEvent(name, description, platform, url, tags, start_date, end_date, calendarId);
      const txReceipt = await txResponse.wait(1);
      const EventId = txReceipt.events[0].args.id;

      expect(txResponse).to.emit(Event, "EventCreated").withArgs(EventId, name, tags)
      expect(EventId).to.equal(0)
    });

  })

  describe("Reminders", function () {
    it("Should schedule an event reminder");
  })

})