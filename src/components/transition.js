/** @jsx jsx */

import { jsx } from "@emotion/core";
import {
    TransitionGroup,
    Transition as ReactTransition,
} from "react-transition-group";
import PropTypes from "prop-types";

function Transition({
    pathname,
    timeout,
    onTransitionEnter,
    onTransitionExit,
    render,
}) {
    return (
        <TransitionGroup css={{ width: "100%", height: "100%" }}>
            <ReactTransition
                key={pathname}
                timeout={timeout}
                onEntering={onTransitionEnter}
                onExited={onTransitionExit}
                appear={true}
            >
                {status => render(status)}
            </ReactTransition>
        </TransitionGroup>
    );
}

Transition.propTypes = {
    pathname: PropTypes.string.isRequired,
    timeout: PropTypes.shape({
        enter: PropTypes.number.isRequired,
        exit: PropTypes.number.isRequired,
    }).isRequired,
    onTransitionEnter: PropTypes.func,
    onTransitionExit: PropTypes.func,
    render: PropTypes.func.isRequired,
};

export function getTransitionStyles(status, timeout) {
    return {
        entering: {
            position: `absolute`,
            top: 0,
            left: 0,
            opacity: 0,
        },
        entered: {
            transition: `opacity ${timeout}ms ease-in-out`,
            opacity: 1,
        },
        exiting: {
            transition: `opacity ${timeout}ms ease-in-out`,
            opacity: 0,
        },
    }[status];
}

export default Transition;
