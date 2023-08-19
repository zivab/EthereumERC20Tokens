import { PropTypes } from 'prop-types';

import { CheckCircleIcon } from '@heroicons/react/20/solid';

const WalletConnection = ({ address }) => {
  return (
    <div className='flex items-center justify-center mt-2 mb-4'>
      <div className='flex items-center text-sm text-gray-100 mr-2'>
        <CheckCircleIcon
          className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-100'
          aria-hidden='true'
        />
        Wallet Connection Status:
      </div>
      {address ? (
        <span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20'>
          Connected
        </span>
      ) : (
        <span className='inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/10'>
          Not connected
        </span>
      )}
    </div>
  );
};

export default WalletConnection;

WalletConnection.propTypes = {
  address: PropTypes.string,
  currentBalance: PropTypes.number,
};
