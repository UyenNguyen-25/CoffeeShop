import { Outlet } from "react-router-dom";
import Navbar from "./Header";
import Sidebar from "./Sidebar";
import { Layout } from "antd";
const { Content } = Layout;

function DashboardLayout() {
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw"
      }}
    >
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <Layout>
        <Navbar />
        <Content className="px-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
