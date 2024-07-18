import { Button, Dropdown, Flex, Space, Typography } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonConnectWallet from "./ButtonConnectWallet";
import { Header } from "antd/es/layout/layout";

const HeaderHome = () => {
    const navigate = useNavigate();
    const backHome = () => {
        navigate("/");
    };

    const items = [
        {
            key: "1",
            label: <Link to="/post">Tạo post</Link>,
        },
        {
            key: "2",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    #
                </a>
            ),
        },
        {
            key: "3",
            label: <Link to="/post">User</Link>,
        },
    ];

    return (
        <div>
            <Header
                style={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: 1000,
                    background: "#fff",
                    padding: "20px",
                    height: "100px",
                }}
            >
                <Flex justify="space-between" align="center">
                    <Typography.Title
                        onClick={backHome}
                        level={3}
                        style={{ color: "#202124", textAlign: "left", margin: 0 }}
                    >
                        Reviews
                    </Typography.Title>
                    {/* <Input title="Search"/> */}
                    <Space>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Button type="primary" size="large">
                                        post
                                    </Button>
                                </Space>
                            </a>
                        </Dropdown>
                        <ButtonConnectWallet />
                    </Space>
                </Flex>
            </Header>
        </div>
    );
};

export default HeaderHome;
