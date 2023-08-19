import './App.css';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import Main from './pages/Main';

function App() {
  return (
    <ThirdwebProvider
      activeChain='goerli'
      clientId={import.meta.env.VITE_THIRDWEBPROVIDER_CLIENT_ID}
    >
      <Main />
    </ThirdwebProvider>
  );
}

export default App;
