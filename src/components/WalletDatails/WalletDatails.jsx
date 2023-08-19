import { PropTypes } from 'prop-types';
import { formatNumber } from '../../utils/numberFormatter';
import { CreditCardIcon, CheckCircleIcon } from '@heroicons/react/20/solid';

const WalletDatails = ({ address, currentBalance }) => {
  return (
    <div className='bg-gradient-to-br from-[#11bdc0] to-[#266768] mx-auto px-4 lg:px-8 rounded-2xl shadow-md lg:w-96 w-[22rem] h-44 mb-10 flex flex-col justify-center'>
      <div className='flex items-center text-sm text-gray-100 mr-2 mb-1'>
        <CheckCircleIcon
          className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-100'
          aria-hidden='true'
        />
        Your wallet address:
      </div>
      <div className='text-sm font-medium font-roboto text-cyan-300 mb-4'>
        {address}
      </div>
      <div className='flex items-center text-sm text-gray-100 mr-2 mb-1'>
        <CreditCardIcon
          className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-100'
          aria-hidden='true'
        />
        Your Current ERC-20 Token Balance is:
      </div>
      <div className='flex items-baseline text-cyan-300'>
        <div className='text-md font-extrabold lg:text-md mr-1'>
          {formatNumber(currentBalance)}
        </div>
        <div className='text-[10px] font-extrabold lg:text-md text-white-500 '>
          HORD6
        </div>
      </div>
    </div>
  );
};

export default WalletDatails;

WalletDatails.propTypes = {
  address: PropTypes.string,
  currentBalance: PropTypes.number,
};
