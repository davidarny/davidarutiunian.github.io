/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useState, Fragment } from "react";
import AnimatedLogo from "./animated-logo";
import Transition, { getTransitionStyles } from "./transition";
import PropTypes from "prop-types";

const ETransitionState = {
    IDLE: "idle",
    ENTER: "enter",
    EXIT: "exit",
};

export function TransitionWithLoader({
    children,
    location,
    timeoutDuration = 1000,
    opacityDuration = 250,
}) {
    const [transitionState, setTransitionState] = useState(
        ETransitionState.IDLE
    );

    return (
        <Fragment>
            <div
                css={{
                    opacity: transitionState === ETransitionState.ENTER ? 1 : 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            >
                <AnimatedLogo duration={timeoutDuration} delay={0} />
            </div>
            <Transition
                timeout={{
                    enter: timeoutDuration + opacityDuration,
                    exit: timeoutDuration + opacityDuration,
                }}
                location={location}
                onTransitionEnter={() =>
                    setTransitionState(ETransitionState.ENTER)
                }
                onTransitionExit={() =>
                    setTransitionState(ETransitionState.EXIT)
                }
                render={status => {
                    return (
                        <div
                            css={{
                                width: "100%",
                                height: "100%",
                                ...getTransitionStyles(status, opacityDuration),
                            }}
                        >
                            {children}
                        </div>
                    );
                }}
            />
        </Fragment>
    );
}

TransitionWithLoader.propTypes = {
    location: PropTypes.object.isRequired,
    timeoutDuration: PropTypes.number,
    opacityDuration: PropTypes.number,
};

export default TransitionWithLoader;
