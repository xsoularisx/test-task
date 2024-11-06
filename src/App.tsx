import './App.css'
import { useState } from 'react';
import { Input, Button, Modal, Form, Table } from 'antd'

function App() {

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
    },
    {
      key: '2',
      name: 'John',
      age: 42,
    },

  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="default">edit</Button>
          <Button onClick={() => handleDelete(record.key)} type="default">delete</Button>
        </>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState(dataSource);
  const [form] = Form.useForm();

  const showModal = () => { setIsModalVisible(true); };
  const hideModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleData = () => {
    form.validateFields().then(values => {
      setData([...data, { key: Date.now(), ...values }]);
      setIsModalVisible(false);
      form.resetFields();
    })
  }

  const handleDelete = (key: string) => {
    setData(data.filter(item => item.key !== key));
  };


  return (
    <>
      <Button type="default" onClick={showModal}>Add</Button>
      <Table dataSource={data} columns={columns} />
      <Modal title="Добавить запись" open={isModalVisible} onOk={handleData} onCancel={hideModal}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Full name" rules={[{ required: true, message: 'Please enter your full name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please enter your age' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default App
