export const traverseTree = (treeNode, path, childrenAttribute = 'children') => {
    if (path.length === 0) {
        return treeNode;
    }

    const pathNodeIndex = path.shift().index;

    for (let [index, node] of treeNode[childrenAttribute].entries()) {
        if (node[childrenAttribute] !== undefined && index === pathNodeIndex) {
            return traverseTree(node, path, childrenAttribute);
        }
    }

    throw Error(`Invalid path given ${path}. No such path in tree!`);
};

export const expandTreePathForUpdate = (path, updateObject, childrenAttribute = 'children') => {
    if (path.length === 0) {
        return updateObject;
    } else {
        const pathNodeIndex = path.shift().index;
        const currentNode = expandTreePathForUpdate(path, updateObject);

        return { [childrenAttribute]: { [pathNodeIndex]: currentNode } };
    }
};

export const pathAsString = (path) => {
    return '/' + path.map(pathElement => pathElement.index).join('/');
};
