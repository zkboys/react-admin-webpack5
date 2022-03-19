import { Button } from 'antd';
import config from 'src/commons/config-hoc';
import { setLoginUser, toHome } from 'src/commons';
import { useCallback } from 'react';

export default config({
    frame: false,
    auth: false,
})(function Login(props) {

    const handleSubmit = useCallback(() => {
        setLoginUser({ id: 123, name: '测试' });
        toHome();
    }, []);
    return (
        <div>
            <Button onClick={handleSubmit}>登录</Button>
        </div>
    );
});
