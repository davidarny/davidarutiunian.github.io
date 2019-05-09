/** @jsx jsx */

import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { ifStateIsFn } from "common";

export function Faded({ displayed = true, timeout = 250, children }) {
    const ifStateIs = ifStateIsFn(displayed);
    const ifStateIsDisplayed = ifStateIs(true);

    return (
        <div
            css={{
                opacity: ifStateIsDisplayed(1, 0),
                transition: `opacity ${timeout}ms ease-in-out`,
            }}
        >
            {children}
        </div>
    );
}

Faded.propTypes = {
    displayed: PropTypes.bool,
    timeout: PropTypes.number,
    css: PropTypes.any,
};

export default Faded;
