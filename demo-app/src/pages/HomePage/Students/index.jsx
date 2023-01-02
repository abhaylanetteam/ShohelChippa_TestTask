import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import uniqid from "uniqid";
import CustomModal from "../../../components/CustomModal";
import CustomTable from "../../../components/CustomTable";
import AddStudentPop from "./AddStudentPop";

const Students = ({ students, setStudents }) => {
  const [togglePop, setTogglePop] = useState(false);
  const [selection, setSelection] = useState([]);
  const [id, setId] = useState(null);
  const [form] = useForm();

  const columns = [
    {
      title: "Enrollment Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Department Name",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "Tution Fee Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => record.status ? "Yes" : " No"
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (_, record) => {
        switch(+record.year) {
            case 1: {
                return `1st Year`
            }
            case 2: {
                return `2nd Year`
            }
            case 3: {
                return `3rd Year`
            }
            case 4: {
                return `4th Year`
            }
            default: {
                return `${record.year} Year`
            }
        }
      }
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => {
        return (
          <div className="edit_wrap">
            <Button
              onClick={() => editStudent(record)}
              style={{ marginRight: "20px" }}
              type="primary"
            >
              Edit
            </Button>
            <Button onClick={() => deleteStudent(record)} type="primary" danger>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const editStudent = (record) => {
    form.setFieldsValue(record);
    setId(record.id);
    setTogglePop(true);
  };

  const deleteStudent = (record) => {
    let temp = students.filter((stud) => stud.id !== record.id );
    setStudents(temp);
  };

  const onSubmit = (values) => {
    if (id) {
      let index = students.findIndex((stud) => stud.id === id);
      if (index > -1) {
        setStudents([
          ...students.slice(0, index),
          { ...values, year: "1st year", id: uniqid() },
          ...students.slice(index + 1),
        ]);
        setId(null);
        setTogglePop(false);
        form.resetFields();
      }
    } else {
      setStudents([...students, { ...values, year: "1", id: uniqid() }]);
      form.resetFields();
      setTogglePop(false);
    }
  };

  const onSelectChange = (selections) => {
    setSelection(selections);
  }

  const rowSelection = {
    selectedRowKeys: selection,
    onChange: onSelectChange,
  }

  const deleteSelected = () => {
    let temp = students.filter((stud) => !selection.includes(stud.id));
    setSelection([]);
    setStudents(temp);
    
  }

  return (
    <div className="student">
      <Button style={{ marginRight: "20px" }} type="primary" onClick={() => setTogglePop(true)}>Add Student</Button>
      <Button disabled={selection.length === 0} onClick={() => deleteSelected()} type="primary" danger>Delete Selected</Button>
      <CustomTable rowKey={"id"} rowSelection={rowSelection} columns={columns} dataSource={students} />
      <CustomModal
        footer={null}
        title="Add Student Pop"
        open={togglePop}
        onCancel={() => setTogglePop(false)}
      >
        <AddStudentPop Form={Form} form={form} onSubmit={onSubmit} />
      </CustomModal>
    </div>
  );
};

export default Students;
