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
