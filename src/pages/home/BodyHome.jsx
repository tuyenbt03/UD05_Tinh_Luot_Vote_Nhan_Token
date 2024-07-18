import { Col, Row  } from "antd";
import BodyLeft from "./BodyLeft";
import BodyRight from "./BodyRight";

function BodyHome() {
    return (
        <>
            <Row gutter={16}>
                <Col span={24} style={{ backgroundColor: "#f0f2f5", padding: "20px" }}>
                    <BodyLeft />
                </Col>
                {/* <Col span={6} style={{ backgroundColor: "#f0f2f5", padding: "20px" }}>
                    <BodyRight />
                </Col> */}
            </Row>
        </>
    );
}

export default BodyHome;
