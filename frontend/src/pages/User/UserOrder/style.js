import styled from "styled-components";
import { Tabs } from "antd";
import TabItem from "./TabItem";

const items = [
  {
    key: '1',
    label: 'Tất cả đơn',
    children: <TabItem />,
  },
  {
    key: '2',
    label: 'Chờ xác nhận',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Đang xử lý',
    children: 'Content of Tab Pane 3',
  },
  {
    key: '4',
    label: 'Đang vận chuyển',
    children: 'Content of Tab Pane 3',
  },
  {
    key: '5',
    label: 'Đã giao',
    children: 'Content of Tab Pane 3',
  },
  {
    key: '6',
    label: 'Đã hủy',
    children: 'Content of Tab Pane 3',
  },
];

const Div = ({ className }) => (
  <div className={className}>
    <Tabs defaultActiveKey="1" items={items}/>
  </div>
);

export const StyledTabs = styled(Div)`
  .ant-tabs {
    gap: 60px;
  }
  .ant-tabs-nav {
    justify-content: space-between;
    background: white;
    border-radius: 5px;
  }
  .ant-tabs >.ant-tabs-nav .ant-tabs-nav-list {
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
