import './App.css'
import { useState } from 'react';
import { Table } from 'antd'
import { Button } from "antd";
import { Modal } from "antd";

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
];

function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => { setIsModalVisible(true); };
  const hideModal = () => { setIsModalVisible(false); };

  return (
    <>
      <Button type="default" className='button' onClick={showModal}>Добавить</Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal title="Добавить запись" open={isModalVisible} onOk={hideModal} onCancel={hideModal}></Modal>
    </>
  )
}

export default App
