import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";


describe("DaoSuiteCalendar", function () {
  async function deploymentFixture() {
    const [deployer] = await ethers.getSigners();

    const Calendar = await ethers.getContractFactory("DaoSuiteCalendar");
    const calendar = await Calendar.deploy();

    return { calendar, deployer };
  }

  describe("Deployment", function () {
    it("Should set the deployer as Owner", async function () {
      const { calendar, deployer } = await loadFixture(deploymentFixture);

      expect(await calendar.owner()).to.equal(deployer.address);
    });

  })

  describe("Events", function () {
    it.only("Should create a calendar", async function () {
      const { calendar } = await loadFixture(deploymentFixture);

      const name = "DAOSuite";
      const tags = ["DAO", "Suite"]

      const txResponse = await calendar.createCalendar(name, tags);
      const txReceipt = await txResponse.wait(1);
      const calendarId = txReceipt.events[0].args.id;
      
      expect(txResponse).to.emit(calendar, "CalendarCreated").withArgs(calendarId, name, tags)
      expect(calendarId).to.equal(0)

    });
    it("Should create an event");
  })

  describe("Reminders", function () {
    it("Should schedule an event reminder");
  })

})