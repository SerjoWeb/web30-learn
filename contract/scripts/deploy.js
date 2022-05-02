// init main function
const main = async () => {
    // factory of transactions which will create instances of transactions
    const Transactions = await hre.ethers.getContractFactory("Transactions");

    // init transactions as awaited Transactions factory
    const transactions = await Transactions.deploy();

    // await transactions deployed consisted Transactions factory
    await transactions.deployed();

    // show the Transactions deployed which addresses of the deployed transactions
    console.log("Transactions deployed to:", transactions.address);
}

// init initMain function as a async function to process the deploy
const initMain = async () => {
    try {
        // await main function
        await main();

        // there are no errors
        process.exit(0);
    } catch (error) {
        // catch the error
        console.error(error);

        // there are some errors
        process.exit(1);
    }
};

// run the initMain function
initMain();