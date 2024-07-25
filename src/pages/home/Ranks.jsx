import { Card, Typography } from "antd";
import { Avatar, List } from "antd";
import { useEffect, useState } from "react";
import RankService from "./../../services/RankService";
const data = [
    {
        title: "Ant Design Title 1",
    },
    {
        title: "Ant Design Title 2",
    },
    {
        title: "Ant Design Title 3",
    },
    {
        title: "Ant Design Title 4",
    },
];
const BodyRight = () => {
    const [ranks, setRanks] = useState();

    const getRanks = async () => {
        const res = await RankService.getRanksSortedByPoints();
        // console.log(res);
        await setRanks([...res]);
    };
    useEffect(() => {
        getRanks();
    }, []);

    return (
        <>
            <List
                style={{
                    backgroundColor: "#ffffff", // Màu nền trắng
                    borderRadius: "5px", // Bo viền
                }}
                bordered
                itemLayout="horizontal"
                dataSource={ranks}
                renderItem={(item, index) => (
                    <List.Item
                        style={
                            {
                                // backgroundColor: "#ffffff", // Màu nền trắng
                                // borderRadius: "10px", // Bo viền
                            }
                        }
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                />
                            }
                            title={
                                <span
                                    style={{
                                        display: "inline-block",
                                        maxWidth: "100%", // Đặt chiều rộng tối đa theo nhu cầu của bạn
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <a>{item.id}</a>
                                </span>
                            }
                            description={"point " + item.totalPoint}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default BodyRight;
