import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { store } from './redux/store';
import { Toaster } from 'react-hot-toast';
import queryStore, { persistor } from './reduxQuery/queryStore';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <ToastContainer/> */}
    <Provider store={queryStore}>
      <PersistGate loading={null} persistor={persistor}>


        <Toaster
          position="top-center"
          reverseOrder={true}
        />
        <App />
        {/* </ToastContainer> */}
      </PersistGate>
    </Provider>
    {/* </Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
