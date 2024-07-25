import { useEffect, useState } from "react";
import Util from "../../util/Util";
import { Button, Card, Col, Input, Modal, Row, Typography } from "antd";
import { toast } from "react-toastify";
import UserService from "./../../services/UserService";

const UserPage = () => {
    const [userLogin, setUserLogin] = useState(null);
    const [name, setName] = useState("");
    const [load, setLoad] = useState(true);
    const handleChange = (e) => {
        setName(e.target.value.trim());
    };

    // modal
    // Open Modal lịch sử hóa đơn
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalLSHD = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const updateUserName = () => {
        if (name.trim().length == 0) {
            toast.warning("nhập user name");
            return;
        }
        const user = {
            ...Util.User,
            username: name,
        };
        // update name
        UserService.update(user.id, user)
            .then((res) => {
                console.log(res);
                toast.success("Cập nhât thành công");
                Util.setUser(user); // cập nhật lại thông tin người dùng trong Util
                setUserLogin(user); // cập nhật lại state
                handleCancel();
                setLoad(!load);
            })
            .catch((err) => {
                toast.warning("Cập nhât thất bại ");
                console.log(err);
            });
    };

    const fetchUser = async () => {
        UserService.getById(Util.User?.id).then((response) => {
            // console.log(response.data);
            setUserLogin({
                ...response.data,
            });
        });
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Card
                style={{ height: "100%", width: "75%", padding: "50px" }}
                title={"Thông tin"}
                extra={
                    <Button
                        onClick={() => {
                            showModalLSHD();
                        }}
                        type="primary"
                    >
                        Edit
                    </Button>
                }
            >
                <Row justify="center" style={{ flex: 1 }}>
                    <Col lg={4} md={24} sm={24}>
                        <Typography.Title level={5}>Name: </Typography.Title>
                    </Col>
                    <Col lg={20} md={24} sm={20}>
                        <Typography.Title level={5}>{userLogin?.username}</Typography.Title>
                    </Col>
                    <Col lg={4} md={24} sm={24}>
                        <Typography.Title level={5}>Publickey: </Typography.Title>
                    </Col>
                    <Col lg={20} md={24} sm={20}>
                        <Typography.Title level={5}>{userLogin?.publickey}</Typography.Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <Typography.Title level={5}>Point: </Typography.Title>
                    </Col>
                    <Col span={20}>
                        <Typography.Title level={5}>{userLogin?.point}</Typography.Title>
                    </Col>
                </Row>
            </Card>

            <Modal width={"50%"} open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Typography.Text>Username: </Typography.Text>
                <Input placeholder="nhập username" onChange={(e) => handleChange(e)} />
                <Row>
                    <Col span={24}>
                        <div className="d-flex justify-content-end mt-2">
                            <Button onClick={updateUserName} type="primary">
                                Thay đổi
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};

export default UserPage;
