require('@nomiclabs/hardhat-waffle');

/**
 * https://faucet.egorfine.com/ - get free ETH for testing (Your Ropsten address - metamask ropsten account number)
 * 
 * https://dashboard.alchemyapi.io/apps/<your-app> - ropstenURL
 * 
 * MetaMask Chrome extension -> three dots -> requisites -> export - mainAccount
 */

const ropstenURL = 'https://eth-ropsten.alchemyapi.io/v2/<your url>';
const mainAccount = '<your metamask account>';

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: ropstenURL,
      accounts: [
        mainAccount
      ]
    }
  }
};

// npx hardhat run scripts/deploy.js --network ropsten - test deploy transaction