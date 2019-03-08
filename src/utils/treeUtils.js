export const traverseTree = (treeNode, path, directoryMimeType) => {
    if (path.length === 0) {
        return treeNode;
    }

    const pathNodeId = path.shift().id;
    const nodesIds = Object.getOwnPropertyNames(treeNode.children);

    for (let nodeId of nodesIds) {
        if (treeNode.children[nodeId].mimeType === directoryMimeType && nodeId === pathNodeId) {
            return traverseTree(treeNode.children[nodeId], path, directoryMimeType);
        }
    }

    throw Error(`Invalid path given ${path}. No such path in tree!`);
};

export const expandTreePathForUpdate = (path, updateObject) => {
    if (path.length === 0) {
        return updateObject;
    } else {
        const pathNodeId = path.shift().id;
        const currentNode = expandTreePathForUpdate(path, updateObject);

        return { children: { [pathNodeId]: currentNode } };
    }
};

export const extendChildrenWithTheirIds = (children) => {
    return Object.getOwnPropertyNames(children).map(key => ({__RDB_NODE_ID__: key, ...children[key]}));
};
