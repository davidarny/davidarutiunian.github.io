/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

function NotFound() {
    return (
        <StaticQuery
            query={graphql`
                query {
                    placeholderImage: file(relativePath: { eq: "not-found.png" }) {
                        childImageSharp {
                            fluid(maxWidth: 750) {
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
                        max-width: 750px;
                        min-width: 200px;
                        margin: auto;
                    `}
                >
                    <Img fluid={data.placeholderImage.childImageSharp.fluid} alt="not-found" />
                </div>
            )}
        />
    );
}

export default NotFound;
