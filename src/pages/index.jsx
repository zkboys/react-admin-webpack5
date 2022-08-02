import Home from 'src/pages/home';
import config from 'src/commons/config-hoc';

export default config()(function Index() {
    return <Home />;
});
