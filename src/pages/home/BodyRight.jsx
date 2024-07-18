import { Card, Typography } from "antd";

const BodyRight = () => {
    return (
        <>
            <Card title={"reviews"}>
                <Typography.Title level={4}>Right Sidebar</Typography.Title>
                <Typography.Paragraph>This is the right sidebar content.</Typography.Paragraph>
            </Card>
        </>
    );
};

export default BodyRight;
