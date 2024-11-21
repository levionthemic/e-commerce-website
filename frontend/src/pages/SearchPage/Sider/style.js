import { Menu } from "antd";
import styled from "styled-components";

export const StyledMenu = styled(Menu)`
  .ant-menu-submenu {
    border-bottom: 1px solid #ddd;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    &:last-child {
      border-bottom: 0;
    }
  }
  .ant-menu-submenu-title {
    padding-left: 10px !important;
  }

  .ant-menu-item-only-child {
    padding-left: 20px !important;
    margin: 0;
    height: fit-content;

    .ant-menu-title-content {
      height: 30px;
    }
  }
`;