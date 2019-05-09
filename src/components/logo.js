/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useEffect, useRef } from "react";
import noop from "lodash.noop";
import PropTypes from "prop-types";

function Logo({ duration, delay, onInitialTweenComplete = noop }) {
    const LazyLinePainterImpl = useRef();
    const playing = useRef(true);

    useEffect(() => {
        import("../vendor/lazy-line-painter-1.9.6.min.js").then(({ default: LazyLinePainter }) => {
            LazyLinePainterImpl.current = LazyLinePainter;
            const tween = paint(LazyLinePainter);
            tween.on("complete", () => {
                onInitialTweenComplete();
                playing.current = false;
                tween.erase();
            });
        });
    }, []);

    useEffect(() => {
        const element = document.querySelector("#penrose");
        const conditions = [playing.current, !LazyLinePainterImpl.current, !element];
        if (conditions.some(Boolean)) {
            return;
        }
        const tween = paint(LazyLinePainterImpl.current, () => (playing.current = true));
        tween.on("complete", () => {
            if (!playing.current) {
                return;
            }
            playing.current = false;
            tween.erase();
        });
        return () => {
            playing.current = false;
            tween.erase();
        };
    });

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="526.36401"
            height="477.03693"
            id="penrose"
            data-llp-composed="true"
            className="lazy-line-painter"
        >
            <g transform="translate(-91.423882,-253.5866)">
                <path
                    d="M 312.32408,254.29303 L 497.87767,584.55178 L 291.61277,584.66663 L 252.04899,655.38029 L 617.26698,655.43727 L 394.46457,254.0866 L 312.32408,254.29303 z "
                    css={css`
                        fill: transparent;
                        fill-opacity: 1;
                        fill-rule: evenodd;
                        stroke-linecap: butt;
                        stroke-linejoin: round;
                    `}
                    data-llp-id="penrose-0"
                    data-llp-duration={duration}
                    data-llp-delay={delay}
                    fillOpacity="0"
                />
                <path
                    d="M 312.31392,254.26591 L 91.923882,655.37223 L 132.32998,728.10322 L 315.16759,396.77318 L 417.193,584.66155 L 498.0052,584.66155 L 312.31392,254.26591 z "
                    css={css`
                        fill: transparent;
                        fill-opacity: 1;
                        fill-rule: evenodd;
                        stroke-linecap: butt;
                        stroke-linejoin: round;
                    `}
                    data-llp-id="penrose-1"
                    data-llp-duration={duration}
                    data-llp-delay={delay}
                    fillOpacity="0"
                />
                <path
                    d="M 315.20979,396.83568 L 355.50104,471.05493 L 251.87272,655.43409 L 617.28788,655.62366 L 578.81741,730.12352 L 132.3464,728.07665 L 315.20979,396.83568 z "
                    css={css`
                        fill: transparent;
                        fill-opacity: 1;
                        fill-rule: evenodd;
                        stroke-linecap: butt;
                        stroke-linejoin: round;
                    `}
                    data-llp-id="penrose-2"
                    data-llp-duration={duration}
                    data-llp-delay={delay}
                    fillOpacity="0"
                />
            </g>
        </svg>
    );
}

Logo.propTypes = {
    duration: PropTypes.number.isRequired,
    delay: PropTypes.number.isRequired,
    onInitialTweenComplete: PropTypes.func,
};

function paint(LazyLinePainter, paintOnlyIf) {
    const element = document.querySelector("#penrose");
    const tween = new LazyLinePainter(element, {
        ease: "easeOutCubic",
        strokeWidth: 1,
        strokeOpacity: 1,
        strokeColor: "#222F3D",
        strokeCap: "square",
    });
    const conditions = [
        !paintOnlyIf,
        typeof paintOnlyIf === "function" && paintOnlyIf(tween),
        typeof paintOnlyIf !== "function" && paintOnlyIf,
    ];
    if (conditions.some(Boolean)) {
        tween.paint();
    }
    return tween;
}

export default Logo;
