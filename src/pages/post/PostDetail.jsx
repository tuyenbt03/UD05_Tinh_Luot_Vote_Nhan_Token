import { Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../services/PostService";

const DetailPost = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [post, setPost] = useState();

    const fetchDetail = async () => {
        console.log("param ", params);
        let res = await PostService.getById(params.id);
        setPost({ ...res.data });
        console.log(res);
    };

    useEffect(() => {
        fetchDetail();
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
            <Card style={{ height: "100%", width: "100%", padding: "50px" }}>
                <Row justify="center" align="middle" style={{ textAlign: "center", width: "100%" }}>
                    <Typography.Title style={{ margin: "0" }}>{post?.title}</Typography.Title>
                </Row>
                <hr className="border  border-2 opacity-50" />
                <Row justify="center" style={{ flex: 1 }}>
                    <Col span={24}>
                        <p>{post?.content}</p>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default DetailPost;
