/* eslint-disable react-hooks/exhaustive-deps */
import { useAddNewUserMutation } from "@/redux/features/users/usersApiSlice";
import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateAccount = ({ refetch }) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const onFinish = async () => {
    try {
      const validFields = await form.validateFields();
      const newUser = {
        fullName: validFields?.fullName,
        phoneNumber: validFields?.phoneNumber,
        password: validFields?.password ? validFields?.password : "123456",
        email: validFields?.email,
        role: validFields?.role,
      };
      console.log(newUser);

      if (!isLoading) {
        await addNewUser(newUser);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }


  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success("Create User Success");
      form.resetFields();
      setIsOpen(false)
    }
    isError && toast.error(error?.data.message);
  }, [isSuccess, isError, error, form]);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusCircleFilled />}
        onClick={() => setIsOpen(!isOpen)}
      >
        Add New User
      </Button>
      <Modal title="Create Account" open={isOpen} onCancel={handleCancel} onOk={onFinish}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullName"
            label="Họ và tên"
            hasFeedback
            validateDebounce={1000}
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Please enter full name" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            hasFeedback
            validateDebounce={1000}
            rules={[
              {
                required: true,
                message: "Mời nhập số điện thoại",
              },
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                message: "Mời nhập lại số điện thoại",
              },
            ]}
          >
            <Input
              placeholder="Please input phone number"
              onKeyDown={(event) => {
                const copyPress = event.ctrlKey && event.key === "C";
                const pastePress = event.ctrlKey && event.key === "V";
                if (
                  !(
                    /[0-9]/.test(event.key) ||
                    event.key === "Backspace" ||
                    event.key === "Enter" ||
                    event.key === "Tab" ||
                    copyPress ||
                    pastePress
                  )
                ) {
                  event.preventDefault();
                }
              }}
              maxLength={12}
            />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input placeholder="Please input email" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password defaultValue="123456" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Radio.Group>
              <Radio.Button value="Manager">Manager</Radio.Button>
              <Radio.Button value="Staff">Staff</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAccount;
