const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal"); // smart contract is compiled and required files are created in artifacts folder
    const waveContract = await waveContractFactory.deploy(
        {
            value: hre.ethers.utils.parseEther("0.01"),
        }
    ); // local ethereum network created and smart contract deployed to it. However, if a network is mentioned, it deploys to that network
    await waveContract.deployed(); // once the contract is deployed, the constructor will run

    console.log("Wave contract deployed to:", waveContract.address);
    console.log("Wave contract deployed by: ", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let contractBalance;
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

    // let waveTxn = await waveContract.connect(randomPerson).wave("Hi First");
    let waveTxn = await waveContract.wave("Hi First");
    await waveTxn.wait(); // wait for the transaction to be mined

    waveCount = await waveContract.getTotalWaves();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

    // waveTxn = await waveContract.connect(randomPerson).wave("Hi Second");
    waveTxn = await waveContract.wave("Hi Second");
    await waveTxn.wait(); // wait for the transaction to be mined

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

    await waveContract.getTotalWaves();
    
    waveList = await waveContract.getAllWaves();
    console.log(waveList);

};

const runMain = async () => {
    try {
        await main();
        process.exit(0); //exit node process without any error
    } catch (error) {
        console.log(error);
        process.exit(1); //exit node process with error "Uncaught Fatal Exception"
    }
};

runMain();
