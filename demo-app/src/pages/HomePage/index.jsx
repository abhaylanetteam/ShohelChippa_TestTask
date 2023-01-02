import { Tabs } from "antd";
import { useState } from "react";
import { studentData } from "../../localDatabase";
import Dashboard from "./Dashboard";
import Departments from "./Departments";
import Students from "./Students";

const HomePage = () => {
  const [students, setStudents] = useState(studentData);

  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          label: `Dashboard`,
          key: "1",
          children: <Dashboard students={students} />,
        },
        {
          label: `Students`,
          key: "2",
          children: <Students students={students} setStudents={setStudents} />,
        },
        {
          label: `Departments`,
          key: "3",
          children: <Departments />,
        },
      ]}
    />
  );
};

export default HomePage;
