import { Avatar, Button, Col, Image, Layout, Menu, Row, Typography } from "antd";
import HeaderHome from "../../components/Header";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { MenuUnfoldOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import ButtonConnectWallet from "../../components/ButtonConnectWallet";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const HomePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const items = [
        {
            key: "1",
            icon: <i className="fa-solid fa-chart-pie"></i>,
            label: (
                <Link style={{ fontSize: 20 }} className="text-decoration-none" to={"/"}>
                    Posts
                </Link>
            ),
        },
        {
            key: "2",
            icon: <i className="fa-solid fa-chart-pie"></i>,
            label: (
                <Link style={{ fontSize: 20 }} className="text-decoration-none" to={"/post"}>
                    Create post
                </Link>
            ),
        },
    ];
    return (
        <div>
            <Layout>
                <Sider
                    collapsed={collapsed}
                    theme="light"
                    width={220}
                    style={{
                        position: "sticky",
                        overflow: "auto",
                        height: "100vh",
                        top: 0,
                        bottom: 0,
                        left: 0,
                    }}
                >
                    <div className="demo-logo-vertical ">
                        {/* <img
                            className="img-fluid"
                            src="https://kenh14cdn.com/Images/Uploaded/Share/2010/09/14/190810adidas02.jpg"
                            alt=""
                        /> */}
                        <Image
                            preview={false}
                            src="https://earn.superteam.fun/assets/logo/logo.svg"
                        />
                        {/* <hr className="m-0" /> */}
                        <br />
                        <br />
                    </div>
                    <Menu theme="light" mode="vertical" items={items} />
                    <br />
                    <div>
                        <WalletMultiButton style={{ fontSize: 22, margin: 5 }} />
                    </div>
                </Sider>
                <Layout>
                    {/* <Header className="bg-white p-0 opacity-75 ">
                        <Row justify={"space-between"} align={"middle"}>
                            <Col span={12}>
                                <div className="header-collapse">
                                    <MenuUnfoldOutlined
                                        onClick={() => setCollapsed(!collapsed)}
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <Row justify={"end"}>
                                    <Avatar
                                        icon={<UserOutlined />}
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Header> */}
                    <Content
                        style={{
                            // margin: "10px 8px",
                            padding: 12,
                            minHeight: "100vh",
                            background: "#f0f2f5",
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default HomePage;
