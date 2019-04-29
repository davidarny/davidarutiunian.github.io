/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import SEO from "../components/seo";
import Row from "antd/es/row";
import Col from "antd/es/col";
import NotFound from "../components/not-found";

function NotFoundPage() {
    return (
        <Fragment>
            <SEO title="404: Not found" />
            <Row
                type="flex"
                justify="center"
                align="middle"
                css={css`
                    height: 100%;
                `}
            >
                <Col xs={24} sm={24}>
                    <NotFound />
                </Col>
            </Row>
        </Fragment>
    );
}

export default NotFoundPage;
