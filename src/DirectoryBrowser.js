import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { traverseTree } from './utils/treeUtils';
import FileNode from './components/FileNode';
import DirectoryNode from './components/DirectoryNode';

class DirectoryBrowser extends Component {
    state = { path: [] };

    goUpDirectoryTree = () => {
        this.setState({ path: this.state.path.slice(0, -1) });
    };

    openDirectory = (id, name) => {
        this.setState({ path: [ ...this.state.path, { id, name } ] });
    };

    getCurrentDirectory = () => {
        const tree = {
            name: 'root',
            mimeType: this.props.config.directoryMimeType,
            children: this.props.tree,
        };

        return traverseTree(tree, [ ...this.state.path ], this.props.config.directoryMimeType);
    };

    nodeToElement = (node) => {
        const { config } = this.props;

        if (node.mimeType === config.directoryMimeType) {
            return <DirectoryNode
                key={node.__RDB_NODE_ID__}
                onClick={() => this.openDirectory(node.__RDB_NODE_ID__, node.name)}
                mimeTypeImage={config.mimeTypes[node.mimeType]}
                name={node.name}
            />;
        }

        return <FileNode
            key={node.__RDB_NODE_ID__}
            mimeTypeImage={config.mimeTypes[node.mimeType]}
            name={node.name}
        />;
    };

    render() {
        const currentNode = this.getCurrentDirectory();

        const childrenAsList = !currentNode.children ? [] : Object.getOwnPropertyNames(currentNode.children).map(c => ({
            ...currentNode.children[c],
            __RDB_NODE_ID__: c,
        }));

        return (
            <div>
                <div>
                    <button id="rdb-go-up" onClick={this.goUpDirectoryTree}>Go up</button>
                    <h3>Directories</h3>
                </div>
                <div>
                    <h5>/{this.state.path.map(node => node.name).join('/')}</h5>
                </div>
                <div>
                    <ul>
                        {childrenAsList.map(this.nodeToElement)}
                    </ul>
                </div>
                <div>
                    Actions
                </div>
            </div>
        );
    }
}

DirectoryBrowser.propTypes = {
    tree: PropTypes.object,
    config: PropTypes.object,
};

export default DirectoryBrowser;
