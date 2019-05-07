/** @jsx jsx */

import "antd/dist/antd.css";
import { jsx, Global, css } from "@emotion/core";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Navbar from "components/navbar";
import Layout from "antd/es/layout";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Icon from "antd/es/icon";
import TransitionWithLoader from "components/transition-with-loader";

const { Header, Footer, Content } = Layout;

function CustomLayout({ children, location, ...rest }) {
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
                            z-index: 1;
                        `}
                    >
                        <Navbar
                            path={path}
                            items={data.site.siteMetadata.menuLinks}
                        />
                    </Header>
                    <Content>
                        <TransitionWithLoader location={location}>
                            {children}
                        </TransitionWithLoader>
                    </Content>
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

export default CustomLayout;
