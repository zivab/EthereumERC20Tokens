import { PropTypes } from 'prop-types';
import { formatNumber } from '../../utils/numberFormatter';

const CurrentBalance = ({ currentBalance }) => {
  return (
    <div className='text-lg font-roboto text-white lg:text-xl mb-6'>
      Your Current Token Balance is:
      <span className='ml-2 text-xl font-extrabold lg:text-2xl'>
        {formatNumber(currentBalance)}
      </span>
    </div>
  );
};

export default CurrentBalance;

CurrentBalance.propTypes = {
  currentBalance: PropTypes.number,
};
