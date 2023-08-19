import { useState, useRef, useEffect } from 'react';
import {
  ConnectWallet,
  useSDK,
  useAddress,
  useBalance,
} from '@thirdweb-dev/react';
import Toastify, {
  successToast,
  transactionErrorToast,
} from './../components/Toast/Toastify';
import Modal from './../components/Modal/Modal';
import Header from './../components/Header/Header';
import { debounce } from './../utils/debounce';
import Form from './../components/Form/Form';
import WalletDatails from '../components/WalletDatails/WalletDatails';
import WalletConnection from '../components/WalletConnection/WalletConnection';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Main = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [spinnerStatus, setSpinnerStatus] = useState(false);

  // Your ERC20 token smart contract address
  const tokenContractAddress = import.meta.env
    .VITE_ERC20_TOKEN_CONTRACT_ADDRESS;

  const sdk = useSDK();
  const address = useAddress();
  const { data, isLoading } = useBalance(tokenContractAddress);

  useEffect(() => {
    if (address && !isLoading) setCurrentBalance(+data.displayValue);
    if (!address) {
      setCurrentBalance(0);
      return;
    }
  }, [isLoading, address, data?.displayValue]);

  const schema = Yup.object().shape({
    address: Yup.string()
      .required('Ethereum address is required')
      .test(
        'is-valid-ethereum-address',
        'Invalid Ethereum address',
        (address) => /^0x[a-fA-F0-9]{40}$/.test(address)
      ),
    tokens: Yup.number()
      .typeError('Amount of tokens must be a number')
      .required('Amount of tokens is required')
      .positive('Amount of tokens must be positive')
      .integer('Amount of tokens must be an integer')
      .max(currentBalance)
      .test(
        'is-available-tokens',
        'Insufficient balance',
        (tokens) => tokens <= currentBalance
      ),
    range: Yup.number().required('Range is required'),
  });

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: '',
      tokens: '',
      range: 0,
    },

    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  function delaySpinner(status, delayTime) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(setSpinnerStatus(status)), delayTime)
    );
  }

  // function handlers
  const onSubmit = async (data) => {
    const { address: toAddress, tokens: amount } = data;

    const tokensAmount = getValues('tokens');
    if (tokensAmount <= 0) {
      trigger(['address', 'range', 'tokens']);
      return;
    }
    if (currentBalance < tokensAmount) {
      trigger(['address', 'range', 'tokens']);
      return;
    }

    try {
      await delaySpinner(true, 500);
      await sdk.wallet.transfer(toAddress, amount, tokenContractAddress);
      successToast();
      setCurrentBalance(currentBalance - tokensAmount);
    } catch (error) {
      transactionErrorToast();
      throw new Error(error.message);
    } finally {
      await delaySpinner(false, 500);
    }
    reset();
  };

  const timer = useRef();

  const handleTokensChange = (value) => {
    if (value > currentBalance) {
      setValue('range', currentBalance);
      setValue('tokens', currentBalance);
      return;
    }
    setValue('range', value);
    setValue('tokens', value);
    debounce(timer, trigger, 'tokens', 500);
  };

  const handleRangeChange = (event) => {
    setValue('tokens', event.target.value);
    setValue('range', event.target.value);
    debounce(timer, trigger, 'tokens', 500);
  };

  return (
    <>
      <div className='mt-22'>
        <Header />
        <Toastify />
        {spinnerStatus && <Modal />}
        <div className='flex flex-col items-center justify-center'>
          <ConnectWalletButton />
          <div className='flex flex-col justify-center items-center gap-y-2 text-md font-roboto text-white lg:text-lg px-4'>
            <WalletConnection address={address} />
            {address && (
              <WalletDatails
                address={address}
                currentBalance={currentBalance}
              />
            )}
          </div>
        </div>
        <Form
          onSubmit={onSubmit}
          handleTokensChange={handleTokensChange}
          handleRangeChange={handleRangeChange}
          handleSubmit={handleSubmit}
          control={control}
          watch={watch}
          errors={errors}
          currentBalance={currentBalance}
          getValues={getValues}
        />
      </div>
    </>
  );
};

export default Main;

const ConnectWalletButton = () => (
  <ConnectWallet className='!rounded-2xl !text-white !bg-gradient-to-br !from-[#11bdc0] !to-[#0a7475]/50 !px-3.5 !py-2.5 !text-sm !font-bold !font-roboto hover:bg-[#33a3a4] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-xl hover:shadow-cyan-500/50 !border-0 !mb-4' />
);
