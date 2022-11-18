import {useEffect, useState} from 'react';
import {Button, Form, Space} from 'antd';
import {PageContent, QueryBar, FormItem, Table, Pagination, Operator, useFunction} from '@ra-lib/adm';
import config from 'src/commons/config-hoc';
import editModal from './editModal';
import detailModal from './detailModal';

export default config({
    title: '用户查询',
})(function UserList(props) {
    const [ loading, setLoading ] = useState(false);
    const [ deleting, setDeleting ] = useState(false);
    const [ pageNum, setPageNum ] = useState(1);
    const [ pageSize, setPageSize ] = useState(20);
    const [ dataSource, setDataSource ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
    const [ form ] = Form.useForm();

    const columns = [
        { title: '用户名', dataIndex: 'userName' },
        { title: '年龄', dataIndex: 'age' },
        {
            title: '操作',
            dataIndex: 'operator',
            width: 150,
            render: (value, record) => {
                const { id, name } = record;
                const items = [
                    {
                        label: '详情',
                        onClick: () => detailModal({ record }),
                    },
                    {
                        label: '修改',
                        onClick: () => editModal({ record, onOk: () => handleSearch({ pageNum: 1 }) }),
                    },
                    {
                        label: '删除',
                        color: 'red',
                        confirm: {
                            title: `您确定删除「${name}」吗？`,
                            onConfirm: () => handleDelete(id),
                        },
                    },
                ];
                return <Operator items={items}/>;
            },
        },
    ];

    // 查询
    const handleSearch = useFunction(async (options = {}) => {
        if(loading) return;
        // TODO 测试数据
        setDataSource([ { id: 1, userName: '张三', age: 11 } ]);

        const values = await form.validateFields();
        const params = {
            ...values,
            pageNum: options.pageNum || pageNum,
            pageSize: options.pageSize || pageSize,
        };
        const res = await props.ajax.get('/users', params, { setLoading });
        const dataSource = res?.content || [];
        const total = res?.totalElements || 0;
        setDataSource(dataSource);
        setTotal(total);
        setPageNum(params.pageNum);
        setPageSize(params.pageSize);
    });

    // 删除
    const handleDelete = useFunction(async (id) => {
        await props.ajax.del(`/users/${id}`, null, { setLoading: setDeleting, successTip: '删除成功！' });
        await handleSearch();
    });

    // 批量删除
    const handleBatchDelete = useFunction(async () => {
        await props.ajax.del(`/users/`, { ids: selectedRowKeys }, { setLoading: setDeleting, successTip: '删除成功！' });
        await handleSearch();
    });

    // 初始化查询
    useEffect(() => {
        (async () => {
            await handleSearch({ pageNum: 1 });
        })();
    }, []);

    const layout = {
        labelCol: { style: { width: 80 } },
        wrapperCol: { style: { width: 200 } },
    };

    return (
        <PageContent loading={loading || deleting}>
            <QueryBar>
                <Form
                    layout="inline"
                    {...layout}
                    form={form}
                    onFinish={async () => await handleSearch({ pageNum: 1 })}
                >
                    <FormItem
                        type="input"
                        label="用户名"
                        name="userName"
                    />
                    <FormItem>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                查询
                            </Button>
                            <Button htmlType="reset">重置</Button>
                            <Button
                                type="primary"
                                onClick={() => editModal({ onOk: () => handleSearch({ pageNum: 1 }) })}
                            >
                                添加
                            </Button>
                            <Button
                                type="primary"
                                danger
                                disabled={!selectedRowKeys?.length}
                                onClick={() => handleBatchDelete()}
                            >
                                删除
                            </Button>
                        </Space>
                    </FormItem>
                </Form>
            </QueryBar>
            <Table
                rowSelection={{
                    selectedRowKeys,
                    onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys),
                }}
                pageNum={pageNum}
                pageSize={pageSize}
                fitHeight
                dataSource={dataSource}
                columns={columns}
                rowKey="id"
            />
            <Pagination
                total={total}
                pageNum={pageNum}
                pageSize={pageSize}
                onPageNumChange={async (pageNum) => await handleSearch({ pageNum })}
                onPageSizeChange={async (pageSize) => await handleSearch({ pageNum: 1, pageSize })}
            />

        </PageContent>
    );
});
