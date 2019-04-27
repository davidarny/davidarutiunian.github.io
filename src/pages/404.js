import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Row from "antd/es/row";
import Col from "antd/es/col";
import NotFound from "../components/not-found";

function NotFoundPage() {
    return (
        <Layout>
            <SEO title="404: Not found" />
            <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ height: "100%" }}
            >
                <Col xs={24} sm={24}>
                    <NotFound />
                </Col>
            </Row>
        </Layout>
    );
}

export default NotFoundPage;
