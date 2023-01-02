import { Modal } from "antd";

const CustomModal = ({ children,  ...rest }) => {
  return (
    <Modal
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
