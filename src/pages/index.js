/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import SEO from "../components/seo";
import Profile from "../components/profile";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Typography from "antd/es/typography";
import { mq } from "../common";

function IndexPage() {
    return (
        <Fragment>
            <SEO title="Me" keywords={["backend", "frontend", `developer`]} />
            <Row
                css={css`
                    flex-direction: column;
                    height: 100%;
                `}
                type="flex"
                justify={"center"}
            >
                <Col xs={24} sm={24}>
                    <Row
                        type="flex"
                        justify="center"
                        css={css`
                            margin-bottom: 2em;
                        `}
                    >
                        <Col xs={24} sm={24}>
                            <Profile />
                        </Col>
                    </Row>
                    <Row
                        type="flex"
                        justify="center"
                        css={css`
                            margin-top: 2em;
                        `}
                    >
                        <Col
                            xs={24}
                            sm={24}
                            css={css`
                                text-align: center;
                            `}
                        >
                            <div
                                css={mq({
                                    fontSize: ["larger", "1em"],
                                    transition: "font-size 0.5s ease-in-out",
                                })}
                            >
                                <Typography.Text>
                                    backend / frontend developer
                                </Typography.Text>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    );
}

export default IndexPage;
