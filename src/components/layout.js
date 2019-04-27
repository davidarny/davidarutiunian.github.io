import "antd/dist/antd.css";
import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Navbar from "./navbar";
import Layout from "antd/es/layout";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Icon from "antd/es/icon";

const { Header, Footer, Content } = Layout;

function CustomLayout({ children }) {
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
                <Layout style={{ height: "100vh" }}>
                    <style jsx global>{`
                        a {
                            color: inherit;
                        }

                        a:hover {
                            color: white;
                        }
                    `}</style>
                    <Header style={{ padding: 0, marginBottom: "1em" }}>
                        <Navbar items={data.site.siteMetadata.menuLinks} />
                    </Header>
                    <Content>{children}</Content>
                    <Footer style={{ marginTop: "1em" }}>
                        <Row type="flex" justify="center">
                            <Col
                                xs={24}
                                sm={24}
                                style={{ textAlign: "center" }}
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
