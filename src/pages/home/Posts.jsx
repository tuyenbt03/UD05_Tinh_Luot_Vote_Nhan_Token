import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Flex, Image, Row, Space, Typography } from "antd";
import { LikeOutlined, StarFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Util from "../../util/Util";
import InteractPostService from "../../services/InteractPostService";
import { toast } from "react-toastify";
import getDateNow from "../../util/GetDateNow";
import UserService from "../../services/UserService";

function BodyLeft() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        fetch("http://localhost:3000/posts")
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

    const likePost = async (post) => {
        if (!Util.User) {
            toast.warning("Vui lòng kết nối ví phantom");
            return;
        }
        InteractPostService.getByPostIdAndUserId(post.id, Util.User.id)
            .then((response) => {
                if (response.data.length > 0) {
                    toast.success("Đã like");
                    console.log("tồn tại");
                    return;
                } else {
                    let endId = Util.generateRandomString(5);
                    const interactPost = {
                        id: "Like" + post.id + endId,
                        name: Util.User.name,
                        postId: post.id,
                        userId: post.userId,
                        createAt: getDateNow(),
                    };
                    InteractPostService.add(interactPost)
                        .then((res) => {
                            // console.log('res ',res.data);
                            // lấy user => like thì point tăng 1
                            UserService.getById(res.data.userId).then((response) => {
                                // console.log(response.data);
                                const user = {
                                    ...response.data,
                                    point: response.data.point + 1,
                                };
                                UserService.update(user.id, user).then((res) => {
                                    console.log(res);
                                });
                            });
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
            <div className="row row-cols-1 row-cols-md-3 g-3">
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
