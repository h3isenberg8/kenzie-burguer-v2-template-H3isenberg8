import toast, { Toaster } from 'react-hot-toast';
import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <GlobalStyles />
    <Router />
    <Toaster />
  </>
);

export default App;
