import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import logo from "../assets/img/logo.png";

export function NavBarComponent() {
  return (
    <Navbar
      fluid
      rounded
      style={{ borderColor: "#e6e7eb", borderWidth: "1.5px" }}
    >
      <NavbarBrand href="https://flowbite-react.com">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Shoppee Koi Fish
        </span>
      </NavbarBrand>

      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownItem>
            <a href="./login">Log out</a>
          </DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
    </Navbar>
  );
}
