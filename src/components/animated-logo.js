/** @jsx jsx */

import { jsx } from "@emotion/core";
import { mq } from "common";
import PropTypes from "prop-types";
import Logo from "components/logo";
import { memo } from "react";

function AnimatedLogo({ duration = 1500, delay = 1000 }) {
    return (
        <div
            css={mq({
                position: "fixed",
                opacity: "0.6",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zoom: ["0.5", "0.6", "0.7", "0.8", "1.0"],
                zIndex: 1,
            })}
        >
            <Logo duration={duration} delay={delay} />
        </div>
    );
}

AnimatedLogo.propTypes = {
    duration: PropTypes.number.isRequired,
    delay: PropTypes.number.isRequired,
};

export default memo(AnimatedLogo);
