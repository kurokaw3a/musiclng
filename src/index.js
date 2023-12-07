import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { injectStore } from './api/ApiFetch';

const root = ReactDOM.createRoot(document.getElementById('root'));
injectStore(store)
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
);
