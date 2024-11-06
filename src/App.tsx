import './App.css'
import { Table } from 'antd'
import { Button } from "antd";

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

  return (
    <>
      <Button type="default" className='button'>Добавить</Button>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default App
