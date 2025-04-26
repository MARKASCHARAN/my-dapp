const hre = require("hardhat");

async function main() {
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  await buyMeACoffee.waitForDeployment();

  console.log("BuyMeACoffee deployed to:", await buyMeACoffee.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
