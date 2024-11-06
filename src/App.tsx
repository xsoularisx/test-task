import { Table } from 'antd'
import './App.css'

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
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default App
