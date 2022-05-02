import React, { useContext } from 'react';

import { SiEthereum } from 'react-icons/si';

import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAdderss';

// test data transactions
import testDataTransactions from '../utils/testDataTransactions';

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
	return (
		<div className="
			bg-[#181918] m-4 flex flex-1 
			2xl:min-w-[450px] 2xl:max-w-[500px] 
			sm:min-w-[270px] sm:max-w-[300px] 
			flex-col p-3 rounded-md hover:shadow-2xl
		">
			<div className="flex flex-col items-center w-full mt-3">
				<div className="w-full mb-6 p-2">
					<div className="flex justify-between items-center">
						<div className="
							w-10 h-10 rounded-full border-2 border-white 
							flex justify-center items-center
						">
							<SiEthereum fontSize={21} color="#fff" />
						</div>
						<p className="text-white text-base text-[#25B81E]">
							Successfully done
						</p>
					</div>
					<div className="h-[1px] w-full bg-gray-400 my-4"></div>
					<a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
						<p className="text-white text-base leading-6 hover:underline hover:decoration-solid hover:decoration-1">
							From:&nbsp;
							<span className="text-[#CBCBCB] underline decoration-1 decoration-dotted" title={addressTo}>
								{shortenAddress(addressFrom)}
							</span>
						</p>
					</a>
					<a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
						<p className="text-white text-base leading-6 hover:underline hover:decoration-solid hover:decoration-1">
							To:&nbsp;
							<span className="text-[#CBCBCB] underline decoration-1 decoration-dotted" title={addressTo}>
								{shortenAddress(addressTo)}
							</span>
						</p>
					</a>
					<p className="text-white text-base">
						Amount:&nbsp;
						<span className="text-[#CBCBCB]">{amount} ETH</span>
					</p>
					{
						message && (
							<>
								<br/>
								<p className="text-white text-base">
									Message: {message}
								</p>
							</>
						)
					}
					<div className="bg-black p-3 px-5 w-max rounded-3xl mt-2 shadow-2xl">
						<p className="text-[#37C7DA] font-bold">
							{timestamp}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const Transactions = () => {
	const { currentAccount, transactions } = useContext(TransactionContext);

	return (
		<div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
			<div className="flex flex-col md:p-12 py-12 px-4">
				{
					currentAccount ? 
					(
						<h4 className="text-white text-center text-3lx my-2">
							Latest Transactions
						</h4>
					) :
					(
						<h4 className="text-white text-center text-3lx my-2">
							Connect your account to see the latest transactions
						</h4>
					)
				}
				<div className="flex flex-wrap justify-center items-center mt-10">
					{
						// render test data instead of transactions - testDataTransactions
						transactions.reverse().map((transaction, index) => (
							<TransactionCard key={`transaction${index}`} {...transaction} />
						))
					}
				</div>
			</div>
		</div>
	);
};

export default Transactions;
