import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Stub from "../components/stub";
import Row from "antd/es/row";
import Col from "antd/es/col";

function Contacts() {
    return (
        <Layout>
            <SEO title="Contacts" keywords={[`David Arutiunian`, "contacts"]} />
            <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ height: "100%" }}
            >
                <Col xs={24} sm={24}>
                    <Stub />
                </Col>
            </Row>
        </Layout>
    );
}

export default Contacts;
