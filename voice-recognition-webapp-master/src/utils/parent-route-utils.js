export function isMatchPath(path_one = '/', path_two = '/', is_strict = false) {
    if (is_strict) {
        return path_one === path_two;
    } else {
        let parent, child;
        if (path_one.length > path_two.length) {
            parent = path_one.split('/');
            child = path_two.split('/');
        } else {
            parent = path_two.split('/');
            child = path_one.split('/');
        }
        return child.every((part, i) => part === parent[i]);
    }
};

export function isParent(route) {
    return Array.isArray(route.children) && route.children.length > 0;
};

export function isActiveParent(pathname, route) {
    return isParent(route) && route.children.some(sub_route => (
        isMatchPath(sub_route.path, pathname) || isActiveParent(pathname, sub_route)
    ));
};

export function flattenRoutes(routes) {
    let flatted_routes = [];
    routes.forEach(route => {
        if (isParent(route)) {
            flatted_routes = [...flatted_routes, ...flattenRoutes(route.children)];
        } else {
            flatted_routes = [...flatted_routes, route];
        };
    })
    return flatted_routes;
};