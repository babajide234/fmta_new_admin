// project import
// import Routes from 'routes';
// import ThemeCustomization from 'themes';
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
import { useEffect } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Loader from ''
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    useEffect(() => {
        window.process = {
            ...window.process
        };
    }, []);
    return (
        <ThemeCustomization>
            <ScrollTop>
                {/* <Loader /> */}
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    );
};

export default App;
