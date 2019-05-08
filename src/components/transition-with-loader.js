/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import AnimatedLogo from "./animated-logo";
import Transition, { getTransitionStyles } from "./transition";
import PropTypes from "prop-types";
import noop from "lodash.noop";

const ETransitionState = {
    IDLE: "idle",
    ENTER: "enter",
    EXIT: "exit",
};

export function TransitionWithLoader({
    children,
    pathname,
    timeoutDuration = 1000,
    opacityDuration = 250,
    onInitialAppear = noop,
}) {
    const [transitionState, setTransitionState] = useState(
        ETransitionState.IDLE
    );

    useEffect(() => {
        setTimeout(() => {
            setTransitionState(ETransitionState.EXIT);
            onInitialAppear();
        }, timeoutDuration + opacityDuration);
    }, []);

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
                <AnimatedLogo
                    pathname={pathname}
                    duration={timeoutDuration}
                    delay={
                        transitionState === ETransitionState.IDLE
                            ? 0
                            : opacityDuration * 2
                    }
                />
            </div>
            <Transition
                timeout={{
                    enter: timeoutDuration + opacityDuration,
                    exit: timeoutDuration + opacityDuration,
                }}
                pathname={pathname}
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
                                position:
                                    transitionState === ETransitionState.ENTER
                                        ? "absolute"
                                        : "initial",
                                top: 0,
                                left: 0,
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
    pathname: PropTypes.string.isRequired,
    timeoutDuration: PropTypes.number,
    opacityDuration: PropTypes.number,
};

export default TransitionWithLoader;
