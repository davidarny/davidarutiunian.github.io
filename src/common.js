import facepaint from "facepaint";

const breakpoints = [576, 768, 992, 1200];
export const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

export function ifStateIsFn(initialState) {
    return comparableState => {
        return (ifTrueHandler, ifFalseHandler) => {
            if (initialState === comparableState) {
                if (typeof ifTrueHandler === "function") {
                    return ifTrueHandler();
                } else {
                    return ifTrueHandler;
                }
            } else {
                if (typeof ifFalseHandler === "function") {
                    return ifFalseHandler();
                } else {
                    return ifFalseHandler;
                }
            }
        };
    };
}
