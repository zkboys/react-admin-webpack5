import storage from 'src/commons/storage';
import { BASE_NAME } from '../config';

export function setLoginUser(loginUser) {
    storage.session.setItem('loginUser', loginUser);
}

export function getLoginUser() {
    return storage.session.getItem('loginUser');
}

export function toLogin() {
    storage.session.clear();
    window.location.href = `${BASE_NAME}/login`;
}

export function isLogin() {
    return window.location.pathname.endsWith('/login');
}

export function toHome() {
    window.location.href = `${BASE_NAME}/`;
}

