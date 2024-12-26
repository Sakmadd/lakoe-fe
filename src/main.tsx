import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider as ChakraProvider } from './components/ui/provider';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.ts';
import { Provider } from 'react-redux';
import { Toaster } from './components/ui/toaster.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
