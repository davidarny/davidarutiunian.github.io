/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useState, Fragment, useRef } from "react";
import AnimatedLogo from "./animated-logo";
import Transition, { getTransitionStyles } from "./transition";
import PropTypes from "prop-types";
import noop from "lodash.noop";
import { ifStateIsFn } from "common";

const ETransitionState = {
    IDLE: "idle",
    ENTER: "enter",
    EXIT: "exit",
    INITIAL_TWEEN: "initial_tween",
};

export function TransitionWithLoader({
    children,
    pathname,
    timings = {
        logo: 1000,
        opacity: 250,
    },
    onInitialTweenComplete = noop,
}) {
    const [state, setTransitionState] = useState(ETransitionState.INITIAL_TWEEN);
    const ifStateIs = ifStateIsFn(state);
    const ifStateIsIdle = ifStateIs(ETransitionState.IDLE);
    const ifStateIsEnter = ifStateIs(ETransitionState.ENTER);
    const ifStateIsInitialTween = ifStateIs(ETransitionState.INITIAL_TWEEN);

    const [completed, setCompletedState] = useState(false);
    const ifCompletedIs = ifStateIsFn(completed);
    const ifStateIsCompleted = ifCompletedIs(true);

    const timer = useRef(0);

    timings.full = timings.logo + timings.opacity;

    return (
        <Fragment>
            <div
                css={{
                    opacity: ifStateIsCompleted(
                        () => ifStateIsEnter(1, 0),
                        () => ifStateIsInitialTween(1, 0)
                    ),
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            >
                <AnimatedLogo
                    pathname={pathname}
                    duration={timings.logo}
                    delay={ifStateIsInitialTween(0, timings.opacity * 2)}
                    onInitialTweenComplete={ifStateIsCompleted(noop, () => () => {
                        setTransitionState(ETransitionState.EXIT);
                        setCompletedState(true);
                        onInitialTweenComplete();
                    })}
                />
            </div>
            {ifStateIsCompleted(
                <Transition
                    timeout={{
                        enter: timings.full,
                        exit: timings.full,
                        appear: timings.opacity,
                    }}
                    pathname={pathname}
                    onTransitionEnter={() => {
                        ifStateIsFn(timer.current)(0)(noop, () => clearTimeout(timer.current));
                        setTransitionState(ETransitionState.ENTER);
                        timer.current = setTimeout(() => {
                            clearTimeout(timer.current);
                            timer.current = 0;
                        }, timings.full);
                    }}
                    onTransitionExit={() => {
                        ifStateIsFn(timer.current)(0)(() => {
                            setTransitionState(ETransitionState.EXIT);
                        });
                    }}
                    render={status => {
                        return (
                            <div
                                css={{
                                    width: "100%",
                                    height: "100%",
                                    visibility: ifStateIsIdle("hidden", "visible"),
                                    position: ifStateIsEnter("absolute", "initial"),
                                    top: 0,
                                    left: 0,
                                    ...getTransitionStyles(status, timings.opacity),
                                }}
                            >
                                {children}
                            </div>
                        );
                    }}
                />
            )}
        </Fragment>
    );
}

TransitionWithLoader.propTypes = {
    pathname: PropTypes.string.isRequired,
    timings: PropTypes.shape({
        logo: PropTypes.number,
        opacity: PropTypes.number,
    }),
    onInitialTweenComplete: PropTypes.func,
};

export default TransitionWithLoader;
