import { Form, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const { Option } = Select;

export default function Dashboard({ students }) {
  const [chartData, setChartData] = useState([]);
  const [filters, setFilters] = useState({ year: "No", status: "No" });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;

  useEffect(() => {
    getChartData();
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getChartData = (evName, evValue) => {
    let filterData = { ...filters, [evName]: evValue };
    const studentCount = students.reduce((acc, cur, index, arr) => {
      return acc.department_name
        ? acc
        : {
            ...acc,
            [cur.department_name]: arr.filter(
              (data) =>
                data.department_name === cur.department_name &&
                (filterData.year !== "No"
                  ? data["year"] === filterData.year
                  : true) &&
                (filterData.status !== "No"
                  ? data["status"] === filterData.status
                  : true)
            ).length,
          };
    }, {});

    const temp = Object.entries(studentCount || {}).reduce(
      (acc, cur) => [...acc, { name: cur[0], value: cur[1] }],
      []
    );
    evName && setFilters({ ...filters, [evName]: evValue });
    setChartData(temp);
  };

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          dataKey="value"
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={60}
          fill="#8884d8"
          label={renderCustomizedLabel}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="top" height={36} />
      </PieChart>
      <Form className="filter_block">
        <Form.Item label="Tution Fee">
          <Radio.Group
            onChange={(e) => getChartData(e.target.name, e.target.value)}
            name="status"
          >
            <Radio value={true}>Paid</Radio>
            <Radio value={false}>Not Paid</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Curriculum Year">
          <Select
            onSelect={(e) => getChartData("year", e)}
            style={{ width: "200px" }}
            name="year"
          >
            <Option value="1">1st Year</Option>
            <Option value="2">2nd Year</Option>
            <Option value="3">3rd Year</Option>
            <Option value="4">4th Year</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}
