import PlainForm from './components/PlainForm';
import ReactHookForm from './components/ReactHookForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <PlainForm />
        <ReactHookForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
