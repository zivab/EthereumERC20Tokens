import { PropTypes } from 'prop-types';

const NoBalance = ({ setCurrentBalance }) => {
  return (
    <div className='mt-10 flex flex-col justify-center items-center gap-y-2 text-md font-roboto text-white lg:text-lg mb-6 px-4'>
      <div>{`Your'e out of tokens.. `}</div>
      <div>{`Click here to load 10,000 more tokens to your account`}</div>
      <div className='mb-4'>
        <a
          href='#'
          className='flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#11bdc0]/50 to-[#11bdc0]/70 px-3.5 py-2.5 text-sm font-bold font-roboto hover:bg-[#33a3a4] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-lg hover:shadow-cyan-500/50'
          onClick={() => setCurrentBalance(10000)}
        >
          Get More Tokens
        </a>
      </div>
    </div>
  );
};

export default NoBalance;

NoBalance.propTypes = {
  setCurrentBalance: PropTypes.func,
};
