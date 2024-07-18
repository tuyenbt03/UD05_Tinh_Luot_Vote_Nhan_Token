import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import PostService from "../../services/PostService";

const schema = yup.object({
    title: yup.string().trim("nhập title").required("Cần nhập Title"),
    content: yup.string().required("Nhập Content"),
});

const yupSync = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};

const CreatePost = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [data, setData] = useState();
    const fetchData = async () => {
        let res = await PostService.getPosts();
        console.log(res);
        setData([...res.data]);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const submitForm = async (values) => {
        const post = {
            ...values,
            id: "",
            userID: "",
            status: 1,
        };
        // Kiểm tra xem danh sách Post có phần tử không
        if (data.length > 0) {
            // Tìm độ dài của danh sách và tạo mã code mới
            const newId = "Post" + (data.length + 1).toString().padStart(3, "0");
            // Đặt giá trị mã code mới vào ID
            post.id = newId;
        } else {
            // Nếu danh sách Post rỗng, sử dụng giá trị mặc định
            post.id = "Post001";
        }

        console.log(post);
        PostService.add(post)
            .then((res) => {
                console.log(res);
                toast.success("Tạo post thành công");
                navigate("/");
            })
            .catch((err) => {
                toast.warning("Tạo post thất bại ");
                console.log(err);
            });
    };

    return (
        <div>
            <Card title={"Tạo post"}>
                <Form
                    onFinish={submitForm}
                    form={form}
                    layout="vertical"
                    style={{
                        maxWidth: 600,
                        margin: "0 auto",
                    }}
                >
                    <Row justify={"center"}>
                        <Col span={24}>
                            <Form.Item name="title" label="Tiêu đề" rules={[yupSync]}>
                                <Input placeholder="Vd Example" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={"center"}>
                        <Col span={24}>
                            <Form.Item name="content" label="Nội dung" rules={[yupSync]}>
                                <Input.TextArea rows={5} placeholder="Vd Example" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/*  */}
                    <Row justify={"center"}>
                        <Button type="primary" htmlType="submit" size="large">
                            Tạo post
                        </Button>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default CreatePost;
