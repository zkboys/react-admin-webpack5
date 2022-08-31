import {wrapperOptions} from '@ra-lib/adm';
import {Tag} from 'antd';
import ajax from 'src/commons/ajax';

/**
 * 项目中可能用到的一些枚举类数据
 * 约定只含有三个参数，
 * {
 *  value: 1,      // 必须且不可重复
 *  label: '名称', // 必须
 *  meta: {},     // 其他数据，可缺省
 *  tag: Tag      // 标签
 * };
 *
 * // 扩展方法
 * options.menuTarget.getLabel('menu')
 * options.yesNo.getTag(true);
 * */
const options = {
    // 菜单目标
    menuTarget: [
        { value: 'menu', label: '应用菜单' },
        { value: 'qiankun', label: '乾坤子应用' },
        { value: 'iframe', label: 'iframe内嵌第三方' },
        { value: '_self', label: '当前窗口打开第三方' },
        { value: '_blank', label: '新开窗口打开第三方' },
    ],
    // 是否
    yesNo: withTag([
        { value: true, label: '是', color: 'green' },
        { value: false, label: '否', color: 'red' },
    ]),
    // 启用、禁用
    enabled: withTag([
        { value: true, label: '启用', color: 'green' },
        { value: false, label: '禁用', color: 'red' },
    ]),
    // 性别
    sex: [
        { value: '1', label: '男' },
        { value: '2', label: '女' },
        { value: '3', label: '未知' },
    ],
    // 可以是函数，异步或同步都可以
    async system() {
        const list = await ajax.get('/menu/queryTopMenus');
        return list.map((item) => {
            return {
                value: item.id,
                label: item.title,
                meta: item,
            };
        });
    },
    action() {
        return [{ value: 'add', label: '添加' }];
        // throw Error('获取失败了');
    },
    // 使用 get
    get demo() {
        return [];
    },
    userStatus: withTag([
        { value: 1, label: '已激活', color: 'green' },
        { value: 2, label: '已禁用', color: 'red' },
        { value: 4, label: '未激活', color: 'red' },
        { value: 5, label: '退出企业', color: 'red' },
    ]),
};

function withTag(options) {
    return options.map((item) => ({ ...item, tag: <Tag color={item.color}>{item.label}</Tag> }));
}

wrapperOptions(options, 1000 * 5);

export default options;
