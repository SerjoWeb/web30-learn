import React, { useContext } from 'react';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import Loader from './Loader';
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAdderss';

const commonStyles = `
	min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] 
	border-gray-400 text-sm font-light text-white
`;

const Input = ({ type, placeholder, name, value, handleChange }) => (
	<input
		type={type}
		placeholder={placeholder}
		name={name}
		value={value}
		step="0.0001"
		onChange={(e) => handleChange(e, name)}
		className="
			my-2 w-full rounded-sm p-2 outline-none 
			border-none bg-transparent text-white 
			text-sm white-glassmorphism
		"
	/>
);

const Welcome = () => {
	// using a context of wallet
	const {
		connectWallet,
		currentAccount,
		formData,
		handleChange,
		sendTransaction,
		isLoading
	} = useContext(TransactionContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		const { addressTo, amount, keyword, message } = formData;

		if (!addressTo || !amount || !keyword || !message) return;

		sendTransaction();
	};

	return (
		<div className="flex w-full justify-center items-center">
			<div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
				<div className="flex flex-1 justify-start flex-col mf:mr-10">
					<h1 className="text-3xl sm:text-5xl text-white text-gradient p-1">
						Safely Crypto
						<br />
						Across the World
					</h1>
					<p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
						By exploring the crypto world, easily and safety sell and buy crypto at Krypto Manager.
					</p>
					{
						!currentAccount && (
							<button
								type="button"
								className="
									flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer 
									hover:bg-[#2546bd]
								"
								onClick={connectWallet}
							>
								<span className="text-white text-base font-semibold">
									Connect Wallet
								</span>
							</button>
						)
					}
					<div className="grid grid-cols-3 w-full mt-10">
						<div className={`rounded-tl-2xl ${commonStyles}`}>
							Reliability
						</div>
						<div className={commonStyles}>
							Security
						</div>
						<div className={`rounded-tr-2xl ${commonStyles}`}>
							Ethereum
						</div>
						<div className={`rounded-bl-2xl ${commonStyles}`}>
							Web 3.0
						</div>
						<div className={commonStyles}>
							Lowest fees
						</div>
						<div className={`rounded-br-2xl ${commonStyles}`}>
							Blockchain
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
					<div className="
						p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 
						eth-card white-glassmorphism
					">
						<div className="flex justify-between flex-col w-full h-full">
							<div className="flex justify-between items-start">
								<div className="
									w-10 h-10 rounded-full border-2 border-white 
									flex justify-center items-center
								">
									<SiEthereum fontSize={21} color="#fff" />
								</div>
								<BsInfoCircle fontSize={17} color="#fff" />
							</div>
							<div>
								<p className="text-white font-light text-sm" title={currentAccount}>
									{shortenAddress(currentAccount)}
								</p>
								<p className="text-white font-semibold text-lg mt-1">
									Ethereum
								</p>
							</div>
						</div>
					</div>
					<div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
						<Input type="text" placeholder="Address To:" name="addressTo" handleChange={handleChange} />
						<Input type="number" placeholder="Amount (ETH)" name="amount" handleChange={handleChange} />
						<Input type="text" placeholder="Keyword" name="keyword" handleChange={handleChange} />
						<Input type="text" placeholder="Enter Message" name="message" handleChange={handleChange} />
						<div className="h-[1px] w-full bg-gray-400 my-2"></div>
						{
							isLoading ? 
							(
								<Loader />
							) 
							: 
							(
								<button
									className="
										text-white w-full mt-2 p-2 border-[1px] border-[#3d4f7c] 
										rounded-full cursor-pointer
									"
									onClick={handleSubmit}
								>
									Send Now
								</button>
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
