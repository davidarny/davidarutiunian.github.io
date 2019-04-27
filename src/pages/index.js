import React from "react";
import SEO from "../components/seo";
import Profile from "../components/profile";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Typography from "antd/es/typography";

function IndexPage() {
    return (
        <>
            <SEO title="Me" keywords={["backend", "frontend", `developer`]} />
            <style jsx>{`
                .subtitle {
                    font-size: 1em;
                    transition: font-size 0.5s ease-in-out;
                }

                @media (min-width: 768px) {
                    .subtitle {
                        font-size: larger;
                    }
                }
            `}</style>
            <Row
                style={{ flexDirection: "column", height: "100%" }}
                type="flex"
                justify={"center"}
            >
                <Col xs={24} sm={24}>
                    <Row
                        type="flex"
                        justify="center"
                        style={{ marginBottom: "2em" }}
                    >
                        <Col xs={24} sm={24}>
                            <Profile />
                        </Col>
                    </Row>
                    <Row
                        type="flex"
                        justify="center"
                        style={{ marginTop: "2em" }}
                    >
                        <Col xs={24} sm={24} style={{ textAlign: "center" }}>
                            <div className="subtitle">
                                <Typography.Text>
                                    backend / frontend developer
                                </Typography.Text>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default IndexPage;
