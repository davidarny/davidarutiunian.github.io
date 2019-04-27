import React from "react";
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
                <>
                    <style jsx>{`
                        .stub {
                            display: block;
                            width: 50%;
                            max-width: 500px;
                            margin: auto;
                        }
                    `}</style>
                    <div className="stub">
                        <Img
                            fluid={data.placeholderImage.childImageSharp.fluid}
                            alt="stub"
                        />
                    </div>
                </>
            )}
        />
    );
}

export default Stub;
