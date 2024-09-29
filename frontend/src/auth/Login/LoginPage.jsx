import { login_type } from "@/constant/loginType";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { Button, Flex, Form, Input, Radio, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [form] = useForm()
  const [loginType, setLoginType] = useState(login_type.at(0).value)

  const onFinish = async (e) => {
    const userLogin = e.phoneNumber ? {
      phoneNumber: e.phoneNumber,
      password: e.password,
    } : {
      email: e.email,
      password: e.password,
    };

    console.log(userLogin);

    try {
      const { accessToken } = await login(userLogin).unwrap();
      dispatch(setCredentials({ accessToken }));
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
  };

  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setLoginType(e.target.value);
    form.resetFields()
  };

  return (
    <Flex vertical="true" justify="center" align="stretch">
      <Typography.Title level={3} className="font-mono">
        Đăng nhập
      </Typography.Title>
      <Form
        name="normal_login"
        className="login-form w-full mt-6"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        {/* radio */}
        <Form.Item label="Chọn phương thức đăng nhập">
          <Radio.Group block options={login_type} defaultValue={1} onChange={onChange} />
        </Form.Item>

        {loginType !== 1 ? <Form.Item label="Số điện thoại">
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8,10})\b/g,
                message: "Vui lòng nhập đúng format 84/0********",
              },
            ]}
            noStyle
          >
            <Input
              placeholder="84/0 ********"
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
        </Form.Item> : <Form.Item label="Email">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhâp tài khoản gmail",
              },

            ]}
            noStyle
          >
            <Input
              placeholder="*@gmail.com"
              inputMode="email"
            />
          </Form.Item>
        </Form.Item>}


        <Form.Item label="Mật khẩu" className="mb-2">
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
            noStyle
          >
            <Input.Password
              placeholder="xin mời nhập mật khẩu"
              iconRender={(visible) =>
                visible ? (
                  <Eye size={20} strokeWidth={1.15} />
                ) : (
                  <EyeOff size={20} strokeWidth={1.15} />
                )
              }
            />
          </Form.Item>
        </Form.Item>

        <Form.Item className="text-end">
          <Typography.Link onClick={() => navigate("/forgot-password")}>
            Quên mật khẩu?
          </Typography.Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form w-full min-h-10"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
export default Login;
