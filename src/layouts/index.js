/** @jsx jsx */

import "antd/dist/antd.css";
import { useState } from "react";
import { jsx, Global, css } from "@emotion/core";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Navbar from "components/navbar";
import Layout from "antd/es/layout";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Icon from "antd/es/icon";
import TransitionWithLoader from "components/transition-with-loader";
import Faded from "components/faded";

const { Header, Footer, Content } = Layout;

function CustomLayout({ children, location, ...rest }) {
    const path = rest["*"];
    const [rendered, setRenderState] = useState(false);

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
                        height: 100%;
                    `}
                >
                    <Global
                        styles={css`
                            a {
                                color: inherit;
                            }

                            body {
                                width: 100%;
                                height: 100%;
                            }

                            #___gatsby {
                                width: 100%;
                                height: 100%;

                                & > div {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        `}
                    />
                    <div
                        css={css`
                            z-index: 10;
                        `}
                    >
                        <Faded displayed={rendered}>
                            <Header
                                css={css`
                                    padding: 0;
                                `}
                            >
                                <Navbar
                                    path={path}
                                    items={data.site.siteMetadata.menuLinks}
                                />
                            </Header>
                        </Faded>
                    </div>
                    <Content>
                        <TransitionWithLoader
                            onInitialAppear={() => setRenderState(true)}
                            pathname={location.pathname}
                        >
                            {children}
                        </TransitionWithLoader>
                    </Content>
                    <Faded displayed={rendered}>
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
                    </Faded>
                </Layout>
            )}
        />
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomLayout;
