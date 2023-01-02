import { Button, Input, Radio, Select } from "antd";
import { rules } from "../../../../utils";

const AddStudentPop = ({ Form, form, onSubmit }) => {
  const { Option } = Select;
  return (
    <div className="add_form">
      <Form form={form} onFinish={onSubmit}>
        <Form.Item
          label="Student Name"
          rules={rules.student_name}
          name="student_name"
        >
          <Input name="student_name" />
        </Form.Item>
        <Form.Item
          label="Department Name"
          rules={rules.department_name}
          name="department_name"
        >
          <Select name="department_name">
            <Option value="Computer">Computer</Option>
            <Option value="IT">IT</Option>
            <Option value="EC">EC</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tution Fee Status" rules={rules.status} name="status">
          <Radio.Group name="status">
            <Radio value={true}>Paid</Radio>
            <Radio value={false}>Not Paid</Radio>
          </Radio.Group>
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AddStudentPop;
