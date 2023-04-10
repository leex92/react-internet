import { useEffect, useState } from "react";
import { Button, Card, Space, Modal, Form, Input,message } from "antd";
import { fetchData, DelData,AddData } from "../../../api/index";
import axios from "axios";
const ManagerScene = () => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetchData("scene")
      .then((res) => {
        console.log(res.data.data);
        setList(res.data.data);
      })
      .catch((err) => {
        message.error(err.response.data.msg);
      });
  };
  const handleDel = (id) => {
    Modal.confirm({
      title: "确定删除此场景吗?",
      onOk: () => {
        DelData("scene", id)
          .then(() => {
            getData();
          })
          .catch(() => {
            message.error("删除失败！");
          });
      },
    });
  };
  const onFinish = (data) => {
    AddData('scene',data).then(()=>{
      getData();
      setVisible(false);
    }).catch(()=>{
      message.error('新增失败')
    })
  };
  const onFinishFailed = () => {};
  return (
    <>
      <div>
        <Button type="primary" onClick={() => setVisible(true)}>
          新增场景
        </Button>
      </div>
      <div>
        <Space>
          {list.map((item, index) => (
            <Card
              size="small"
              key={index}
              extra={
                <Button type="link" danger onClick={() => handleDel(item.id)}>
                  删除
                </Button>
              }
              title={item.name}
              style={{ width: 300 }}
            >
              <p>{item.description}</p>
            </Card>
          ))}
        </Space>
      </div>
      <Modal
        title="新增场景"
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
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManagerScene;
