import { useEffect, useState } from "react";
import { Row, Button, Table, Space, Modal, message } from "antd";
import axios from "axios";
const ManagerUser = () => {
  const [list, setList] = useState([]);
  const columns = [
    {
      title: "编号",
      dataIndex: "id",
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "密码",
      dataIndex: "password",
    },
    {
      title: "type",
      dataIndex: "type",
    },
    {
      title: "操作",
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary">编辑</Button>
            <Button type="primary" danger onClick={() => handleDel(record.id)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  const fetchList = () => {
    axios.get("/api/user/list").then(({ data }) => {
      setList(data.data);
    });
  };
  const handleDel = (id) => {
    Modal.confirm({
      title: "删除",
      content: "确定要删除此用户吗?",
      onOk: () => {
        axios.get(`/api/user/delete?id=${id}`).then(({ data }) => {
          console.log(data);
          if (data.success) {
            message.success("删除成功");
            fetchList();
          }
        });
      },
    });
  };
  useEffect(() => {
    fetchList();
  }, []);

  return <Table columns={columns} dataSource={list} key={"id"} />;
};

export default ManagerUser;
