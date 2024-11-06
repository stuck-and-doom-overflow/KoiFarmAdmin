import { Sidebar } from "flowbite-react";
import { HiChartPie, HiOutlineLogout, HiShoppingBag } from "react-icons/hi";
import { IoHome, IoFish, IoNewspaperOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { GiSchoolOfFish } from "react-icons/gi";
import '../screens/Login/login.scss'

export function SidebarComponent() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        style={{ borderColor: "#e6e7eb", borderWidth: "1px", height: "100%" }}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/home" icon={IoHome}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="Management">
              <Sidebar.Item href="/fishTable" icon={IoFish}>
                Fishes
              </Sidebar.Item>
              <Sidebar.Item href="/userTable" icon={FaUserFriends}>
                Users
              </Sidebar.Item>
              <Sidebar.Item href="/news" icon={IoNewspaperOutline}>
                News
              </Sidebar.Item>
              <Sidebar.Item href="/orderTable" icon={RiBillLine}>
                Orders
              </Sidebar.Item>
              <Sidebar.Item href="/fishPackage" icon={GiSchoolOfFish}>
                Fish Package
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href="/login" icon={HiOutlineLogout}>
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
