import { createConfigHoc, modalDestroyAll as _modalDestroyAll } from '@ra-lib/adm';
import { AppContext } from 'src/app-context';
import { toLogin } from 'src/commons';
import { IS_SUB } from 'src/config';
import { ajaxHoc } from 'src/commons/ajax';
import {connect as reduxConnect} from 'src/models';
import theme from 'src/theme.less';

export const modalDestroyAll = _modalDestroyAll;

export default createConfigHoc({
    AppContext,
    IS_SUB,
    ajaxHoc,
    theme,
    toLogin,
    ejectProps: {},
    modalCommonProps: {},
    drawerCommonProps: {},
    reduxConnect,
});
