import { PropTypes } from 'prop-types';

const NoBalanceNew = () => {
  return (
    <div className='mt-10 flex flex-col justify-center items-center gap-y-2 text-md font-roboto text-white lg:text-lg mb-6 px-4'>
      <div>{`Your Ethereum wallet balance is currently 0... `}</div>
      <div>{`You need to have a balance of at least 0.001 ETH in order to process`}</div>
      <div>{`the transfer transaction on the Ethereum blockchain.`}</div>
    </div>
  );
};

export default NoBalanceNew;

NoBalanceNew.propTypes = {
  setCurrentBalance: PropTypes.func,
};
