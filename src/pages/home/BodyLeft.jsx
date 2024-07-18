import { useEffect, useState } from "react";
import { Button, Card, Col, Flex, Image, Row, Space, Typography } from "antd";
import { LikeOutlined, StarFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Util from "../../util/Util";
import InteractPostService from "../../services/InteractPostService";
import { toast } from "react-toastify";

function BodyLeft() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([
        {
            id: 3,
            title: "Đánh giá sản A",
            content: "lorem 20",
            userID: 1,
            status: 1,
        },
    ]);

    const fetchPosts = async () => {
        fetch("http://localhost:5000/posts")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setPosts([...data]);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const likePost = async (e) => {
        InteractPostService.getByPostIdAndUserId(e.id, Util.User.id)
            .then((response) => {
                if (response.data.length > 0) {
                     toast.success("Đã like");
                    console.log("tồn tại");
                    return;
                } else {
                    let endId = Util.generateRandomString(5);
                    const interactPost = {
                        id: "Like" + e.id + endId,
                        name: Util.User.name,
                        like: 1,
                        comment: "",
                        type: 1,
                        postId: e.id,
                        userId: Util.User.id,
                    };
                    InteractPostService.add(interactPost)
                        .then((res) => {
                            console.log(res);
                            // toast.success("Tạo post thành công");
                            navigate("/");
                        })
                        .catch((err) => {
                            toast.warning("Like thất bại ");
                            console.log(err);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                return;
            });
    };

    return (
        <>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {posts?.map((element, idx) => (
                    <div className="col" key={idx}>
                        <div
                            className="card h-100"
                            style={{ maxHeight: "600px", display: "flex", flexDirection: "column" }}
                        >
                            <div className="card-body" style={{ flex: 1 }}>
                                <h2
                                    className="card-title"
                                    onClick={() => {
                                        navigate("/post/" + element.id);
                                    }}
                                >
                                    {element.title}
                                </h2>
                                <p
                                    className="card-text"
                                    style={{
                                        color: "#7f858d",
                                        fontSize: 18,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 5 /* Số dòng muốn hiển thị */,
                                    }}
                                >
                                    {element.content}
                                </p>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "auto",
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        likePost(element);
                                    }}
                                    size="large"
                                    type="text"
                                    icon={<LikeOutlined />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BodyLeft;
