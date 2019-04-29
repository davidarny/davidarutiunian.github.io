/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

function Stub() {
    return (
        <StaticQuery
            query={graphql`
                query {
                    placeholderImage: file(relativePath: { eq: "stub.png" }) {
                        childImageSharp {
                            fluid(maxWidth: 500) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            `}
            render={data => (
                <div
                    css={css`
                        display: block;
                        width: 50%;
                        max-width: 500px;
                        min-width: 200px;
                        margin: auto;
                    `}
                >
                    <Img
                        fluid={data.placeholderImage.childImageSharp.fluid}
                        alt="stub"
                    />
                </div>
            )}
        />
    );
}

export default Stub;
