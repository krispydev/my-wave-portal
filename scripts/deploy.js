const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Account that will deploy the contract: ", deployer.address);
    console.log("Balance: ", accountBalance.toString());

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    console.log("Contract Compiled. Now, going to deploy.");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    console.log("Contract Deploying...");
    await waveContract.deployed();
    console.log("Contract Deployed");

    console.log("Contract is deployed to:", waveContract.address);

    accountBalance = await deployer.getBalance();
    console.log("Balance: ", accountBalance.toString());
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();


// const main = async () => {
//     const [deployer] = await hre.ethers.getSigners();
//     const accountBalance = await deployer.getBalance();
  
//     console.log("Deploying contracts with account: ", deployer.address);
//     console.log("Account balance: ", accountBalance.toString());
  
//     const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
//     const waveContract = await waveContractFactory.deploy();
//     await waveContract.deployed();
  
//     console.log("WavePortal address: ", waveContract.address);
//   };
  
//   const runMain = async () => {
//     try {
//       await main();
//       process.exit(0);
//     } catch (error) {
//       console.log(error);
//       process.exit(1);
//     }
//   };
  
//   runMain();