/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import Row from "antd/es/row";
import Col from "antd/es/col";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { mq } from "common";

function Navbar({ path, items = [] }) {
    const [active, setActive] = useState(-1);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const nextActiveIndex = items.findIndex(
            item => item.url === `/${path}`
        );
        setActive(nextActiveIndex);
    }, [items, path]);

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
                                    onItemClick={() => setOpen(false)}
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
    path: PropTypes.string.isRequired,
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
    onItemClick,
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
            <Link prefetch="true" to={item.url} onClick={onItemClick}>
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
    onItemClick: PropTypes.func,
};

export default Navbar;
