import './App.css'
import { useState } from 'react';
import { Input, Button, Modal, Form, Table } from 'antd'

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
    render: () => (
      <>
        <Button type="default">edit</Button>
        <Button type="default">delete</Button>
      </>
    ),
  },
];

function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState(dataSource);
  const showModal = () => { setIsModalVisible(true); };
  const hideModal = () => { setIsModalVisible(false); };

  return (
    <>
      <Button type="default" onClick={showModal}>Add</Button>
      <Table dataSource={data} columns={columns} />
      <Modal title="Добавить запись" open={isModalVisible} onOk={hideModal} onCancel={hideModal}>
        <Form>
          <Form.Item name="fullName" label="Full name" rules={[{ required: true, message: 'Please enter your full name' }]}>
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
