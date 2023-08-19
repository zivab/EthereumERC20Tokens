import { PropTypes } from 'prop-types';
import { formatNumber } from '../../utils/numberFormatter';
import { TokenSvg, EtheriumSvg, TransferSvg } from '../../assets/Assets';
import { Controller } from 'react-hook-form';

const Form = ({
  onSubmit,
  handleTokensChange,
  handleRangeChange,
  handleSubmit,
  control,
  watch,
  errors,
  currentBalance,
  getValues,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='bg-gradient-to-tl from-[#312323] to-[#11bdc0] mx-auto py-6 sm:px-6 lg:px-8 rounded-2xl shadow-xl lg:w-96 w-[22rem]'>
        {/* Adress input*/}
        <div className='px-10 lg:px-2'>
          <label
            htmlFor='address'
            className='block text-sm font-bold leading-6 text-white font-roboto'
          >
            Destenation Adress
          </label>
          <div className='relative mt-2 rounded-2xl shadow-sm'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1'>
              <span className='text-gray-500 sm:text-sm'>
                <EtheriumSvg />
              </span>
            </div>
            <Controller
              name='address'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id='address'
                  type='text'
                  className={`block w-full rounded-2xl border-0 py-1.5 pl-7 pr-2 text-white/90 font-semibold ring-1 ring-inset ring-gray-300 placeholder:text-[#3b8c8e] placeholder:font-medium focus:ring-2 outline-[#11bdc0] focus:ring-inset focus:ring-[#11bdc0] sm:text-sm sm:leading-6 bg-[#a6d4d5]/70 ${
                    errors.address
                      ? 'outline-rose-400 focus:ring-inset focus:ring-rose-400'
                      : ''
                  }`}
                  placeholder='Ethereum destenation address'
                  disabled={!currentBalance}
                />
              )}
            />
          </div>
          {errors.address && (
            <p className='mt-2 text-sm text-rose-400 font-roboto font-semibold'>
              {errors.address.message}
            </p>
          )}
        </div>
        {/* amount input*/}
        <div className='mt-4 mb-12 px-10 lg:px-2'>
          <label
            htmlFor='tokens'
            className='block text-sm font-bold leading-6 text-white font-roboto'
          >
            Amount of tokens
          </label>
          <div className='relative mt-2 rounded-2xl shadow-sm'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1'>
              <span className='text-gray-500 sm:text-sm'>
                <TokenSvg />
              </span>
            </div>
            <Controller
              name='tokens'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id='tokens'
                  type='number'
                  className={`block w-full rounded-2xl border-0 py-1.5 pl-8 pr-2 text-white/90 font-semibold ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-[#11bdc0] focus:ring-inset focus:ring-[#11bdc0] sm:text-sm sm:leading-6 bg-[#a6d4d5]/70 ${
                    errors.tokens
                      ? 'outline-rose-400 focus:ring-inset focus:ring-rose-400'
                      : ''
                  }`}
                  onChange={(e) => handleTokensChange(e.target.value)}
                  disabled={!currentBalance}
                />
              )}
            />
          </div>
          {errors.tokens && (
            <p className='mt-2 text-sm text-rose-400 font-roboto font-semibold'>
              {errors.tokens.message}
            </p>
          )}
        </div>
        {/* Range input*/}
        <div className='my-4 px-10 lg:px-2'>
          <div className='rounded-2xl p-4 shadow-lg bg-gradient-to-r from-[#11bdc0]/10 to-[#052728]/70 text-white/80 '>
            <div className='price-range p-4'>
              <span className='text-sm '>
                {getValues('tokens') !== false
                  ? formatNumber(watch('tokens'))
                  : 0}
              </span>
              <Controller
                name='range'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id='range'
                    type='range'
                    min={1}
                    max={currentBalance}
                    step={1}
                    className='w-full accent-[#11bdc0] cursor-pointer'
                    onChange={handleRangeChange}
                    disabled={!currentBalance}
                  />
                )}
              />

              <div className='-mt-1 flex w-full justify-between mb-4'>
                <span className='text-sm'>1</span>
                <span className='text-sm'>{formatNumber(currentBalance)}</span>
              </div>
              {errors.range && (
                <p className='mt-2 text-xs text-rose-400 font-roboto font-semibold'>
                  {errors.range.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Submit button */}
        <div className='mt-10 flex items-center justify-center gap-x-6 lg:justify-center'>
          <button
            type='submit'
            className='flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#11bdc0]/50 to-[#11bdc0]/70 px-3.5 py-2.5 text-sm font-bold font-roboto hover:bg-[#33a3a4] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-lg hover:shadow-cyan-500/50'
            disabled={!currentBalance}
          >
            <TransferSvg />
            Trasnfer Tokens
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func,
  handleTokensChange: PropTypes.func,
  handleRangeChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  control: PropTypes.object,
  watch: PropTypes.func,
  errors: PropTypes.object,
  currentBalance: PropTypes.number,
  getValues: PropTypes.func,
};
