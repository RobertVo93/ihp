import React, { useState } from "react";
import {
    Nav,
    NavItem,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    NavLink
} from "reactstrap";

const Example = () => {
    const [dropdownOpen, setDropdownOpen] = useState(true);

    return (
        <div>
            <Nav pills>
                <NavItem>
                    <NavLink href="#" active>
                        Link
                    </NavLink>
                </NavItem>
                <Dropdown
                    nav
                    isOpen={dropdownOpen}
                    toggle={() => setDropdownOpen(!dropdownOpen)}
                >
                    <DropdownToggle nav caret>
                        Dropdown
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavItem>
                    <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Another Link</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled href="#">
                        Disabled Link
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    );
};
export default Example;
