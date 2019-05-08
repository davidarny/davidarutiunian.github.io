/** @jsx jsx */

import { jsx } from "@emotion/core";
import PropTypes from "prop-types";

export function Faded({ displayed = true, timeout = 250, children }) {
    return (
        <div
            css={{
                opacity: displayed ? 1 : 0,
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
