/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import SEO from "../components/seo";
import ProfilePicture from "../components/profile-picture";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Typography from "antd/es/typography";
import { mq } from "../common";
import Centered from "../layouts/centered";

const { Text, Paragraph } = Typography;

function IndexPage() {
    return (
        <Fragment>
            <SEO title="Home" keywords={["backend", "frontend", `developer`]} />
            <Centered>
                <div
                    css={css`
                        overflow-x: hidden;
                        padding: 8px;
                        padding-top: calc(1em + 8px);
                    `}
                >
                    <Row gutter={64}>
                        <LeftSide />
                        <RightSide />
                    </Row>
                </div>
            </Centered>
        </Fragment>
    );
}

function LeftSide() {
    return (
        <Col
            xs={24}
            sm={24}
            md={{ offset: 2, span: 10 }}
            lg={{ offset: 3, span: 9 }}
            xl={{ offset: 4, span: 8 }}
            xxl={{ offset: 5, span: 7 }}
            css={mq({
                marginBottom: ["16px", "16px", "unset"],
            })}
        >
            <div
                css={mq({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: ["center", "center", "flex-end"],
                })}
            >
                <Row
                    css={css`
                        margin-bottom: 2em;
                    `}
                >
                    <Col>
                        <ProfilePicture />
                    </Col>
                </Row>
                <Row
                    css={css`
                        display: inline-block;
                    `}
                >
                    <Col>
                        <div
                            css={mq({
                                fontSize: ["larger", "1em"],
                                transition: "font-size 0.3s ease-in-out",
                                paddingRight: ["unset", "2.5px"],
                            })}
                        >
                            <Text>backend / frontend developer</Text>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}

function RightSide() {
    return (
        <Col
            xs={{ offset: 2, span: 20 }}
            sm={{ offset: 3, span: 18 }}
            md={{ offset: 0, span: 10 }}
            lg={{ offset: 0, span: 9 }}
            xl={{ offset: 0, span: 8 }}
            xxl={{ offset: 0, span: 7 }}
            css={mq({
                marginTop: ["16px", "16px", "64px"],
                height: "100%",
            })}
        >
            <div
                css={mq({
                    display: "block",
                    fontSize: ["initial", "initial", "larger"],
                    transition: "font-size 0.3s ease-in-out",
                })}
            >
                <Paragraph>
                    Hello!{" "}
                    <span role="img" aria-label="hand">
                        ✋
                    </span>{" "}
                    <br /> My name is David. I'm backend / frontend developer
                    currently working at
                    <a
                        href="https://omega-r.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Omega-R"
                    >
                        &nbsp;Omega-R
                    </a>
                    <span role="img" aria-label="heart">
                        &nbsp;❤
                    </span>
                    . I love building complex systems and writing simple and
                    elegant code
                    <span role="img" aria-label="laptop">
                        &nbsp;💻
                    </span>
                    .
                </Paragraph>
            </div>
        </Col>
    );
}

export default IndexPage;
