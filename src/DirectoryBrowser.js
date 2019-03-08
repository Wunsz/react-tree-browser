import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FileNode from './components/FileNode';
import DirectoryNode from './components/DirectoryNode';
import withTreeBrowser from './hoc/withTreeBrowser';

class DirectoryBrowser extends Component {
    nodeToElement = (node) => {
        const { directoryMimeType, mimeTypes, onOpenDirectory } = this.props;

        if (node.mimeType === directoryMimeType) {
            return <DirectoryNode
                key={node.__RDB_NODE_ID__}
                onClick={() => onOpenDirectory(node.__RDB_NODE_ID__, node.name)}
                mimeTypeImage={mimeTypes[node.mimeType]}
                name={node.name}
            />;
        }

        return <FileNode
            key={node.__RDB_NODE_ID__}
            mimeTypeImage={mimeTypes[node.mimeType]}
            name={node.name}
        />;
    };

    render() {
        const { onGoToParentDirectory, path, currentNode } = this.props;

        const childrenAsList = !currentNode.children ? [] : Object.getOwnPropertyNames(currentNode.children).map(c => ({
            ...currentNode.children[c],
            __RDB_NODE_ID__: c,
        }));

        return (
            <div>
                <div>
                    <h5><button id="rdb-go-up" onClick={onGoToParentDirectory}>Go up</button> /{path.map(node => node.name).join('/')}</h5>
                </div>
                <div>
                    <ul>
                        {childrenAsList.map(this.nodeToElement)}
                    </ul>
                </div>
            </div>
        );
    }
}

DirectoryBrowser.propTypes = {
    onGoToParentDirectory: PropTypes.func.isRequired,
    onOpenDirectory: PropTypes.func.isRequired,
    currentNode: PropTypes.any.isRequired,
    path: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })),
    directoryMimeType: PropTypes.string.isRequired,
    mimeTypes: PropTypes.any.isRequired,
};

export default withTreeBrowser(DirectoryBrowser);
