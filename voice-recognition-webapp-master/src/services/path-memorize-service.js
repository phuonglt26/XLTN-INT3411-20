let lastPath = null;

export function saveLastPath(path) {
    if (!lastPath) {
        lastPath = path;
    }
};

export function popLastPath() {
    const path = lastPath;
    lastPath = null;
    return path;
};

window.getLastPath = () => lastPath;