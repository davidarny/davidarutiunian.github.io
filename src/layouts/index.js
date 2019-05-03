/** @jsx jsx */

import "antd/dist/antd.css";
import { jsx, Global, css } from "@emotion/core";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Navbar from "../components/navbar";
import Layout from "antd/es/layout";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Icon from "antd/es/icon";
import { mq } from "../common";
import Logo from "../components/logo";

const { Header, Footer, Content } = Layout;

function CustomLayout({ children, ...rest }) {
    const path = rest["*"];

    return (
        <StaticQuery
            query={graphql`
                query {
                    site {
                        siteMetadata {
                            title
                            menuLinks {
                                title
                                id
                                url
                            }
                        }
                    }
                }
            `}
            render={data => (
                <Layout
                    css={css`
                        height: 100vh;
                    `}
                >
                    <Global
                        styles={css`
                            a {
                                color: inherit;
                            }
                        `}
                    />
                    <Header
                        css={css`
                            padding: 0;
                            margin-bottom: 1em;
                            z-index: 1;
                        `}
                    >
                        <Navbar
                            path={path}
                            items={data.site.siteMetadata.menuLinks}
                        />
                    </Header>
                    <AnimatedLogo path={path} />
                    <Content>{children}</Content>
                    <Footer
                        css={css`
                            margin-top: 1em;
                        `}
                    >
                        <Row type="flex" justify="center">
                            <Col
                                xs={24}
                                sm={24}
                                css={css`
                                    text-align: center;
                                `}
                            >
                                <span>David Arutiunian</span>
                                <span>&nbsp;</span>
                                <Icon type="copyright" />
                            </Col>
                        </Row>
                    </Footer>
                </Layout>
            )}
        />
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

function AnimatedLogo({ path }) {
    return (
        <div
            css={mq({
                position: "absolute",
                opacity: ["0.8", "0.6", "0.4"],
                right: ["-200px", "-90px", "-70px", "-10px"],
                top: ["-120px", "-20px", "-60px", "-20px"],
                transform: [
                    "scale(0.175) rotate(-27deg)",
                    "scale(0.3) rotate(-27deg)",
                    "scale(0.4) rotate(-27deg)",
                    "scale(0.6) rotate(-27deg)",
                ],
                display: path === "" ? "block" : "none",
            })}
        >
            <Logo />
        </div>
    );
}

AnimatedLogo.propTypes = {
    path: PropTypes.string.isRequired,
};

export default CustomLayout;
