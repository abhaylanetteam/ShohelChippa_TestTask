import { Table } from "antd"

const CustomTable = ({ ...rest }) => {
    return (
        <div className="custom_table">
            <Table {...rest} />;
        </div>
    )
}

export default CustomTable