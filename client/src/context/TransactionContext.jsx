import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { contractABI, contractAddress } from '../utils/constants';

/** create a react context */
export const TransactionContext = React.createContext();

// init ethereum as a global window param
const { ethereum } = window;

// setting up our commision
const gas = '0x5208';

// function get ethereum contracts
const getEthereumContract = () => {
    // init a provider
    const provider = new ethers.providers.Web3Provider(ethereum);
    
    // init a signer
    const signer = provider.getSigner();
    
    // inist a transaction contract
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    // return the contract
    return transactionContract;
};

// export transaction provider as a param is a children and return a transaction context provider
export const TransactionProvider = ({ children }) => {
    // set current account state
    const [currentAccount, setCurrentAccount] = useState('');

    // form state
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    });

    // set loading state
    const [isLoading, setIsLoading] = useState(false);

    // set transactions
    const [transactions, setTransactions] = useState([]);

    // handle chenge function which provides prev state and update only we need to update
    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }));
    };

    // get all transactions
    const getAllTransaction = async () => {
        try {
            // check if the wallet is connected
            if (!ethereum) return alert("Please install Metamask app!");

            // transactionContract - get ethereum contract
            const transactionContract =  getEthereumContract();

            // init transaction which are available
            const availableTransactions = await transactionContract.getAllTransactions();

            // init a structured data of transactions
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));

            setTransactions(structuredTransactions);
        } catch (err) {
            // cath the error
            console.error(err);

            // throw an error
            throw new Error("There are no available transactions!");
        }
    };

    // transaction count store
    const [tranasactionCount, setTranasactionCount] = useState(localStorage.getItem('tranasactionCount'));

    // check if the wallet is connected
    const walletConnected = async () => {
        try {
            // check if the wallet is connected
            if (!ethereum) return alert("Please install Metamask app!");

            // get the accounts
            const accounts = await ethereum.request({
                method: 'eth_accounts'
            });

            // check if there are any of accounts, straight set a current account and get all transactions
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransaction();
            } else {
                console.info("There are no accounts found!");
            }
        } catch (err) {
            // cath the error
            console.error(err);

            // throw an error
            throw new Error("There is no ethereum object!");
        }
    };

    // check if the transactions exists
    const transactionExists = async () => {
        try {
            // transactionContract - get ethereum contract
            const transactionContract =  getEthereumContract();

            // get transaction count
            const tranasactionCount = await transactionContract.getTransactionCount();

            // set local storage as a transaction count
            window.localStorage.setItem("tranasactionCount", tranasactionCount);
        } catch (err) {
            // cath the error
            console.error(err);

            // throw an error
            throw new Error("There are no transactions yet!");
        }
    };

    // function to connect wallet
    const connectWallet = async () => {
        try {
            // check if the wallet is connected
            if (!ethereum) return alert("Please install Metamask app!");

            // get the accounts
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            });

            setCurrentAccount(accounts[0]);
        } catch (err) {
            // cath the error
            console.error(err);

            // throw an error
            throw new Error("There is no ethereum object!");
        }
    };

    // send transaction function
    const sendTransaction = async () => {
        try {
            // check if the wallet is connected
            if (!ethereum) return alert("Please install Metamask app!");

            // get data from form
            const { addressTo, amount, keyword, message } = formData;

            // transactionContract - get ethereum contract
            const transactionContract =  getEthereumContract();

            // parse amount from decimat to hex
            const parsedAmount = ethers.utils.parseEther(amount);

            // send ethereum
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: gas,
                    value: parsedAmount._hex
                }]
            });

            // store a transaction as a transaction hash
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            // set loading true 
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);

            // wait for the transaction (hash)
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            // get transaction count
            const tranasactionCount = await transactionContract.getTransactionCount();

            // set store transaction count
            setTranasactionCount(tranasactionCount.toNumber());

            // reload page after transaction done
            location.reload();
        } catch (err) {
            // cath the error
            console.error(err);

            // throw an error
            throw new Error("There is no ethereum object!");
        }
    };

    // call the funcs check on a load of our app
    useEffect(() => {
        walletConnected();
        transactionExists();
    }, []);

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            handleChange,
            sendTransaction,
            transactions,
            isLoading
        }}>
            {children}
        </TransactionContext.Provider>
    );
};
