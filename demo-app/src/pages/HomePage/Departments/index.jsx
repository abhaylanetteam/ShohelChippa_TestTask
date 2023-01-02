import CustomTable from "../../../components/CustomTable";
import { departmentData } from "../../../localDatabase";

const Departments = ()  => {
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Department Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Curriculum',
            dataIndex: 'curriculum',
            key: 'curriculum',
          },
      ];


    return (
       <div className="departments" >
            <CustomTable 
                columns={columns} 
                dataSource={departmentData}
            />
       </div>
    )
}

export default Departments