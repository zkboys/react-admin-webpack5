import React, {useState, useEffect, useCallback} from 'react';
import {Helmet} from 'react-helmet';
import {Button, Form} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {FormItem, queryStringify, setLoginUser} from '@ra-lib/adm';
import config from 'src/commons/config-hoc';
import {toHome} from 'src/commons';
import {Logo, Proxy} from 'src/components';
import {IS_DEV, IS_TEST, IS_PREVIEW} from 'src/config';
import c from 'classnames';
import s from './style.module.less';

// 开发模式下，默认填充的账号密码
const FORM_VALUES = {
    account: 'P101282',
    password: '0000',
};


// 登录接口所需的其他参数
const QUERY_STRING = queryStringify({
    phoneCode: '0000',
    captchaCode: '0000',
    captchaId: '578721818865569792',
    srandNumFlagId: 1,
    isPhone: false,
    isCheck: true,
});

export default config({
    auth: false,
    layout: false,
})(function Login(props) {
    const [message, setMessage] = useState();
    const [isMount, setIsMount] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = useCallback(async (values) => {
        if (loading) return;

        const { account, password } = values;
        const params = {
            loginName: account,
            password,
        };

        try {
            const res = await props.ajax.post(`/login/login?${QUERY_STRING}`, params, { baseURL: '/portal', setLoading, errorTip: false });
            const { id, loginName: name, token, ...others } = res;
            setLoginUser({
                id, // 必须字段
                name, // 必须字段
                token, // 其他字段按需添加
                ...others,
            });
            toHome();
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || '用户名或密码错误');
        }
    }, [loading, props.ajax]);

    useEffect(() => {
        // 开发时默认填入数据
        if (IS_DEV || IS_TEST || IS_PREVIEW) {
            form.setFieldsValue(FORM_VALUES);
        }

        setTimeout(() => setIsMount(true), 300);
    }, [form]);

    const formItemClass = c(s.formItem, { [s.active]: isMount });

    return (<div className={s.root}>
        <Helmet title="欢迎登录"/>
        <div className={s.logo}>
            <Logo/>
        </div>
        <Proxy className={s.proxy}/>
        <div className={s.box}>
            <Form form={form} name="login" onFinish={handleSubmit}>
                <div className={formItemClass}>
                    <h1 className={s.header}>欢迎登录</h1>
                </div>
                <div className={formItemClass}>
                    <FormItem
                        name="account"
                        allowClear
                        autoFocus
                        prefix={<UserOutlined/>}
                        placeholder="请输入用户名"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    />
                </div>
                <div className={formItemClass}>
                    <FormItem
                        type="password"
                        name="password"
                        prefix={<LockOutlined/>}
                        placeholder="请输入密码"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    />
                </div>
                <div className={formItemClass}>
                    <FormItem noStyle shouldUpdate style={{ marginBottom: 0 }}>
                        {() => (<Button
                            className={s.submitBtn}
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            disabled={// 用户没有操作过，或者没有setFieldsValue
                                !form.isFieldsTouched(true) || // 表单中存在错误
                                form.getFieldsError().filter(({ errors }) => errors.length).length}
                        >
                            登录
                        </Button>)}
                    </FormItem>
                </div>
            </Form>
            <div className={s.errorTip}>{message}</div>
        </div>
    </div>);
});
