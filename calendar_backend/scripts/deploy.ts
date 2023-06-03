import { ethers } from "hardhat";

async function main() {
  const Lock = await ethers.getContractFactory("DaoSuiteCalendar");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(
    `DaoSuiteCalendar deployed to ${lock.address} - Owner is ${(await lock.owner())}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
