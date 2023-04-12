import { useEffect, useState } from 'react';
import { Row, Button, Table, Space, Modal, message, Form, Input } from 'antd';
import axios from 'axios';
const ManagerUser = () => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('add');
  const [form] = Form.useForm();
  const handleEdit = (data) => {
    Modal.confirm({
      title: '开始比赛',
      content: '确认开始比赛吗？',
      onOk: () => {
        handleStart(data);
      },
    });
  };
  const handleStart = (data) => {
    axios
      .post('/api/match/update', {
        ...data,
        reserve5: 'start',
      })
      .then(({ data }) => {
        if (data.success) {
          message.success('比赛开始');
          getData();
        } else {
          message.error(data.error);
        }
      });
  };
  const columns = [
    {
      title: '赛名',
      dataIndex: 'name',
    },
    {
      title: '拓扑图地址',
      dataIndex: 'reserve1',
    },
    {
      title: '裁判',
      dataIndex: 'reserve2',
    },
    {
      title: '靶机id',
      dataIndex: 'reserve3',
    },
    {
      title: '攻击者',
      dataIndex: 'users',
      render: (data, record) => {
        if (data.length) {
          const arr = data.filter((item) => item.status == 2);
          console.log('攻击者', arr);
          return <>{arr[0]?.name}</>;
        } else {
          return <>未知</>;
        }
      },
    },
    {
      title: '防御者',
      dataIndex: 'users',
      render: (data, record) => {
        if (data.length) {
          const arr = data.filter((item) => item.status == 3);
          console.log('防御者', arr);
          return <>{arr[0]?.name}</>;
        } else {
          return <>未知</>;
        }
      },
    },
    {
      title: '比赛状态',
      dataIndex: 'reserve5',
      render: (data, record) => {
        if (data === 'start') {
          return <>比赛进行中</>;
        } else {
          return <>比赛未开始</>;
        }
      },
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => handleEdit(record)}
              disabled={record.reserve5 === 'start'}
            >
              开始比赛
            </Button>
            {record.reserve5 === 'start' && (
              <>
                <Button type="primary" onClick={() => handleAttact(record)}>
                  攻击
                </Button>
                <Button type="primary" onClick={() => handleDefense(record)}>
                  防御
                </Button>
              </>
            )}
          </Space>
        );
      },
    },
  ];
  const handleAttact = (data) => {
    axios.get(`/api/myweapon/fire?id=${data.reserve4}`).then(({ data }) => {
      if (data.success) {
        message.success('攻击成功');
      } else {
        message.error(data.message);
      }
    });
  };
  const handleDefense = (data) => {
    axios.get(`/api/myweapon/fire?id=${data.reserve4}`).then(({ data }) => {
      if (data.success) {
        message.success('防御成功');
      } else {
        message.error(data.message);
      }
    });
  };
  const getData = () => {
    axios.get('/api/match/list').then(({ data }) => {
      setList(data.data);
    });
  };
  const handleDel = (id) => {
    Modal.confirm({
      title: '删除',
      content: '确定要删除此用户吗?',
      onOk: () => {
        axios.get(`/api/user/delete?id=${id}`).then(({ data }) => {
          console.log(data);
          if (data.success) {
            message.success('删除成功');
            fetchList();
          }
        });
      },
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const onFinish = (data) => {
    if (status === 'add') {
      axios
        .post('/api/user/registry', {
          ...data,
        })
        .then(({ data }) => {
          if (data.success) {
            getData();
            setVisible(false);
          } else {
            message.error(data.message);
          }
        })
        .catch(() => {
          message.error('新增失败');
        });
    } else {
      axios
        .post('/api/user/update', data)
        .then(({ data }) => {
          console.log(data, '~~~~~');
          if (data.success) {
            getData();
            setVisible(false);
          } else {
            message.error(data.message);
          }
        })
        .catch(() => {
          message.error('修改失败');
        });
    }
  };
  const onFinishFailed = () => {
    s;
  };
  return (
    <>
      <Table columns={columns} dataSource={list} key={'id'} />
      <Modal
        title={status === 'add' ? '新增用户' : '编辑用户'}
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form
          name="form"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {status === 'edit' && (
            <Form.Item label="id" name="id">
              <Input disabled />
            </Form.Item>
          )}
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your path!' }]}
          >
            <Input />
          </Form.Item>
          {status === 'edit' && (
            <Form.Item
              label="用户类型"
              name="type"
              rules={[{ required: true, message: 'Please input your path!' }]}
            >
              <Input />
            </Form.Item>
          )}
          {/* <Form.Item
      label="账号"
      name="reserve3"
      rules={[{ required: true, message: "Please input your path!" }]}
    >
      <Input disabled={status==='edit'}/>
    </Form.Item> */}
          {/* <Form.Item
      label="密码"
      name="reserve4"
      rules={[{ required: true, message: "Please input your path!" }]}
    >
      <Input disabled={status==='edit'}/>
    </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManagerUser;
