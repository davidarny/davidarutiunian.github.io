/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import Row from "antd/es/row";
import Col from "antd/es/col";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { mq } from "../common";

function Navbar({ items = [] }) {
    const [active, setActive] = useState(-1);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("menuItems", JSON.stringify(items));
        return () => localStorage.removeItem("menuItems");
    }, [items]);

    useEffect(() => {
        async function fetchActiveIndex() {
            try {
                await waitUntil(
                    () => localStorage.getItem("activeMenuIndex") !== null
                );
            } catch (error) {
                console.warn(error);
            }
            const activeMenuIndex = localStorage.getItem("activeMenuIndex");
            try {
                const nextActive = JSON.parse(activeMenuIndex);
                setActive(nextActive);
            } catch (_) {
                console.warn("Error when parsing 'activeMenuIndex'");
            }
        }

        fetchActiveIndex();
    });

    return (
        <Row type="flex" align="middle" css={{ height: "100%" }}>
            <Col xs={24} sm={24}>
                <nav
                    css={css`
                        overflow: hidden;
                    `}
                >
                    <div
                        css={mq({
                            display: ["none", "block"],
                            marginLeft: "1em",
                        })}
                    >
                        <div css={mq({ display: ["none", "block"] })}>
                            <NavbarItems
                                items={items}
                                active={active}
                                color={{ active: "white", main: "grey" }}
                                display="inline-block"
                            />
                        </div>
                    </div>
                    <div css={mq({ display: ["block", "none"] })}>
                        <NavbarBurger open={open} onToggle={setOpen} />
                        <div
                            css={css`
                                position: absolute;
                                width: 100%;
                                background: white;
                                margin-top: ${open ? "1em" : "initial"};
                                padding-left: 1em;
                            `}
                        >
                            {open && (
                                <NavbarItems
                                    items={items}
                                    active={active}
                                    color={{
                                        active: "#001529",
                                        main: "darkgrey",
                                    }}
                                    display="block"
                                    navbarItemStyles={{
                                        display: "block",
                                        float: "left",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </nav>
            </Col>
        </Row>
    );
}

Navbar.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ),
};

function NavbarBurger({
    size = 30,
    height = 5,
    background = "white",
    open = false,
    onToggle,
}) {
    return (
        <div
            css={css`
                margin-left: 1em;
                position: relative;
                width: ${size}px;
                height: ${size}px;
                cursor: pointer;
            `}
            onClick={() => onToggle(!open)}
        >
            <div
                css={css`
                    position: absolute;
                    background: ${background};
                    width: 100%;
                    height: ${height}px;
                    top: 50%;
                    transform: translateY(50%);
                    right: 0px;
                    margin-top: -5px;
                    opacity: 1;
                    border-radius: 1px;

                    &::after,
                    &::before {
                        transition: all 0.3s ease-in-out;
                    }

                    &::before {
                        position: absolute;
                        background: ${background};
                        width: ${size}px;
                        height: ${height}px;
                        top: ${height * 2}px;
                        content: "";
                        display: block;
                        border-radius: 1px;
                    }

                    &::after {
                        position: absolute;
                        background: ${background};
                        width: ${size}px;
                        height: ${height}px;
                        bottom: ${height * 2}px;
                        content: "";
                        display: block;
                        border-radius: 1px;
                    }
                `}
            />
        </div>
    );
}

NavbarBurger.propTypes = {
    size: PropTypes.number,
    height: PropTypes.number,
    background: PropTypes.string,
    open: PropTypes.bool,
    onToggle: PropTypes.func,
};

function NavbarItems({
    items,
    active,
    color,
    display,
    styles: navbarItemStyles,
}) {
    return items.map((item, index) => (
        <div
            key={item.id}
            css={mq({
                margin: ["initial", "0 10px 0 10px"],
                display,
                color: active === index ? color.active : color.main,
                ...navbarItemStyles,
            })}
        >
            <Link prefetch="true" to={item.url}>
                {item.title}
            </Link>
        </div>
    ));
}

NavbarItems.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    active: PropTypes.number.isRequired,
    color: PropTypes.shape({
        main: PropTypes.string.isRequired,
        active: PropTypes.string.isRequired,
    }),
    display: PropTypes.string.isRequired,
    navbarItemStyles: PropTypes.object,
};

async function waitUntil(predicate, timeout = 1000) {
    let timer = 0;
    return new Promise((resolve, reject) => {
        timer = setInterval(() => {
            if (predicate()) {
                clearInterval(timer);
                resolve();
            }
        }, 0);
        setTimeout(() => {
            clearInterval(timer);
            reject(new Error("'waitUntil' timeout"));
        }, timeout);
    });
}

export default Navbar;
