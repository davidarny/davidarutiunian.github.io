import React, { useState, useEffect } from "react";
import Row from "antd/es/row";
import Col from "antd/es/col";
import PropTypes from "prop-types";
import { Link } from "gatsby";

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
        <>
            <style jsx>{`
                .navbar {
                    overflow: hidden;
                }

                .wide {
                    display: none;
                    margin-left: 1em;
                }

                .narrow .items {
                    position: absolute;
                    width: 100%;
                    background: white;
                    margin-top: ${open ? "1em" : "initial"};
                    padding-left: 1em;
                }

                .narrow .item {
                    display: block;
                    float: left;
                }

                @media (min-width: 576px) {
                    .wide,
                    .items {
                        display: block;
                    }

                    .narrow {
                        display: none;
                    }
                }
            `}</style>
            <Row type="flex" align="middle" style={{ height: "100%" }}>
                <Col xs={24} sm={24}>
                    <nav className="navbar">
                        <div className="wide">
                            <div className="items">
                                <NavbarItems
                                    items={items}
                                    active={active}
                                    color={{ active: "white", main: "grey" }}
                                    display="inline-block"
                                />
                            </div>
                        </div>
                        <div className="narrow">
                            <div>
                                <NavbarBurger open={open} onToggle={setOpen} />
                            </div>
                            <div className="items">
                                {open && (
                                    <NavbarItems
                                        items={items}
                                        active={active}
                                        color={{
                                            active: "darkgreen",
                                            main: "darkgrey",
                                        }}
                                        display="block"
                                    />
                                )}
                            </div>
                        </div>
                    </nav>
                </Col>
            </Row>
        </>
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
        <>
            <style jsx>{`
                .menu {
                    margin-left: 1em;
                    position: relative;
                    width: ${size}px;
                    height: ${size}px;
                    cursor: pointer;
                }

                .burger,
                .burger::before,
                .burger::after {
                    transition: all 0.3s ease-in-out;
                }

                .burger {
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
                }

                .burger::before {
                    position: absolute;
                    background: ${background};
                    width: ${size}px;
                    height: ${height}px;
                    top: ${height * 2}px;
                    content: "";
                    display: block;
                    border-radius: 1px;
                }

                .burger::after {
                    position: absolute;
                    background: ${background};
                    width: ${size}px;
                    height: ${height}px;
                    bottom: ${height * 2}px;
                    content: "";
                    display: block;
                    border-radius: 1px;
                }
            `}</style>
            <div className="menu" onClick={() => onToggle(!open)}>
                <div className="burger" />
            </div>
        </>
    );
}

NavbarBurger.propTypes = {
    size: PropTypes.number,
    height: PropTypes.number,
    background: PropTypes.string,
    open: PropTypes.bool,
    onToggle: PropTypes.func,
};

function NavbarItems({ items, active, color, display }) {
    return (
        <>
            <style jsx>{`
                .item {
                    display: ${display};
                    margin: 0 5px 0 5px;
                    color: ${color.main};
                }

                .item[active="active"] {
                    color: ${color.active};
                }

                .link {
                    text-decoration: none;
                    color: inherit;
                }
            `}</style>
            {items.map((item, index) => (
                <div
                    key={item.id}
                    active={active === index ? "active" : undefined}
                    className="item"
                >
                    <Link prefetch="true" to={item.url}>
                        {item.title}
                    </Link>
                </div>
            ))}
        </>
    );
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
