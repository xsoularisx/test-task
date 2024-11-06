import './App.css';
import { useState } from 'react';
import { Input, Button, Modal, Form, Table, Popconfirm } from 'antd';

interface DataRecord {
  key: string;
  name: string;
  age: number;
}

function App() {
  const dataSource: DataRecord[] = [
    {
      key: '1',
      name: 'Иванов Иван Иванович',
      age: 32,
    },
    {
      key: '2',
      name: 'Смирнов Серей Сергеевич',
      age: 42,
    },
    {
      key: '3',
      name: 'Петрова Анна Александровна',
      age: 53,
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '25%',
      sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '25%',
      render: (_: string, record: DataRecord) => (
        <>
          <Button
            className="button__action"
            onClick={() => openModal(record)}
            type="default"
          >
            edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => deleteRecord(record.key)}
          >
            <Button className="button__action" type="default">
              delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState<DataRecord[]>(dataSource);
  const [editData, setEditData] = useState<DataRecord | null>(null);
  const [form] = Form.useForm();

  const openModal = (record: DataRecord | null) => {
    if (record) {
      setEditData(record);
      form.setFieldsValue(record);
    } else {
      setEditData(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleData = async () => {
    try {
      const values = await form.validateFields();
      const newData: DataRecord = {
        key: Date.now().toString(),
        ...values,
      } as DataRecord;

      if (editData) {
        setData(
          data.map(item =>
            item.key === editData.key ? { ...item, ...values } : item,
          ),
        );
      } else {
        setData([...data, newData]);
      }
      closeModal();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const deleteRecord = (key: string) => {
    setData(data.filter(item => item.key !== key));
  };

  return (
    <>
      <Button
        className="button__main"
        type="default"
        onClick={() => openModal(null)}
      >
        Add new record
      </Button>
      <Table dataSource={data} columns={columns} />
      <Modal
        title="Add record"
        open={isModalVisible}
        onOk={handleData}
        onCancel={closeModal}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Full name"
            rules={[
              { required: true, message: 'Please enter your full name' },
              { min: 2, message: 'Name must contain at least two letters' },
              {
                pattern: /^[A-Za-zА-Яа-яЁё\s]+$/,
                message: 'Name must contain only letters',
              },
            ]}
          >
            <Input placeholder="Enter your last name, first name, patronymic" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              { required: true, message: 'Please enter your age' },
              {
                pattern: /^(0|[1-9][0-9]?)$/,
                message: 'Age must be a non-negative two-digit number (0-99)',
              },
            ]}
          >
            <Input placeholder="Enter your age" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default App;
