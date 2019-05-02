/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

function ProfilePicture() {
    return (
        <StaticQuery
            query={graphql`
                query {
                    placeholderImage: file(relativePath: { eq: "avatar.jpg" }) {
                        childImageSharp {
                            fluid(maxWidth: 350) {
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
                        width: 30%;
                        max-width: 350px;
                        min-width: 200px;
                        border-radius: 50%;
                        overflow: hidden;
                        box-shadow: 0px 4px 6px 2px lightgrey;
                    `}
                >
                    <Img
                        fluid={data.placeholderImage.childImageSharp.fluid}
                        alt="David Arutiunian"
                        title="David Arutiunian"
                    />
                </div>
            )}
        />
    );
}

export default ProfilePicture;
