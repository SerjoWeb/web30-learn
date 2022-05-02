/**
 * import abi from transaction json we got from (contract -> artifacts -> contracts -> Transactions.sol -> Transactions.json)
 * and created a new one in: client -> src -> utils -> Transactions.json
 * */
import abi from './Transactions.json';

// export ABI
export const contractABI = abi.abi;

// export a contract address received from deployed transaction
export const contractAddress = '<contract address...>';
