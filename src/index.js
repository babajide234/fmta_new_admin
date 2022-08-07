window.process = {};
// import { StrictMode } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';
// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';
import ls from 'localstorage-slim';
// import NotificationProvider from 'components/Notifications/NotificationProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //
ls.config.encrypt = true;

ReactDOM.render(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <ToastContainer />
            <App />
        </BrowserRouter>
    </ReduxProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
