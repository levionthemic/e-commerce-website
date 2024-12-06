import styled from "styled-components";
import { Tabs, Input } from "antd";
import { CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";

export  const StyledTabs = styled(Tabs)`
  .ant-tabs {
    gap: 60px;
  }
  .ant-tabs-nav {
    justify-content: space-between;
    background: white;
    border-radius: 5px;
  }
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
    justify-content: space-between;
    width: 100%;
  }
  .ant-tabs .ant-tabs-tab {
    width: calc(100% / 6);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-tabs .ant-tabs-tab .ant-tabs-tab-btn {
    color: rgba(0, 0, 0, 50%);
    font-size: 16px;
    font-family: Roboto, sans-serif;
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: black;
    font-weight: 500;
  }
  .ant-tabs .ant-tabs-ink-bar {
    background: black;
  }
`;



export const StyledInput = styled(Input)`
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  &:hover {
    border-color: black;
  }
  &:focus {
    border-color: black;
    box-shadow: none;
  }
`;


export const StyledCheckSquare = styled(CheckSquareFilled)`
  font-size: 30px;
  color: #4caf50; /* Màu xanh */
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.2); /* Phóng to khi hover */
  }
`;

export const StyledCloseSquare = styled(CloseSquareFilled)`
  font-size: 30px;
  color: #f44336; /* Màu đỏ */
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.2); /* Phóng to khi hover */
  }
`;
