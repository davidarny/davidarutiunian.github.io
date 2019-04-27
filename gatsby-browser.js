exports.onRouteUpdate = async ({ location }) => {
    try {
        await waitUntil(() => localStorage.getItem("menuItems") !== null);
    } catch (error) {
        console.warn(error);
    }
    const menuItems = localStorage.getItem("menuItems");
    try {
        const parsedMenuItems = JSON.parse(menuItems);
        const nextActiveItem = parsedMenuItems.findIndex(
            item => item.url === location.pathname
        );
        localStorage.setItem("activeMenuIndex", nextActiveItem);
    } catch (_) {
        console.warn("Error when parsing 'menuItems'");
    }
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
