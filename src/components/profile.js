import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

function Profile() {
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
                <>
                    <style jsx>{`
                        .picture {
                            display: block;
                            width: 30%;
                            max-width: 350px;
                            min-width: 200px;
                            margin: auto;
                            border-radius: 50%;
                            overflow: hidden;
                            box-shadow: 0px 4px 6px 2px lightgrey;
                        }
                    `}</style>
                    <div className="picture">
                        <Img
                            fluid={data.placeholderImage.childImageSharp.fluid}
                            alt="David Arutiunian"
                        />
                    </div>
                </>
            )}
        />
    );
}

export default Profile;
