/** @jsx jsx */

import { jsx, css } from "@emotion/core";

export function Centered({ children }) {
    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
            `}
        >
            {children}
        </div>
    );
}

export default Centered;
