const Header = () => {
  return (
    <h1 className='mt-10 mb-8 text-3xl font-extrabold text-white/90 md:text-5xl lg:text-6xl'>
      <span className='text-transparent bg-clip-text bg-gradient-to-tr to-emerald-600 from-sky-400 mr-2'>
        Transfer Ethereum ERC-20
      </span>
      <div className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-2 text-2xl lg:text-4xl'>
        Tokens
        <span className='text-2xl lg:text-4xl text-white/90 ml-2'>
          With Ease
        </span>
      </div>
    </h1>
  );
};

export default Header;
