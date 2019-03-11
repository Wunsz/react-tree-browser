import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FileNode from './components/FileNode';
import DirectoryNode from './components/DirectoryNode';
import withTreeBrowser from './hoc/withTreeBrowser';
import { pathAsString } from './utils/treeUtils';

class DirectoryBrowser extends Component {
    nodeToElement = (node, index) => {
        const { childrenAttribute, mimeTypes, onOpenDirectory, getDisplayName, getMimeType, path } = this.props;
        const nodeKey = pathAsString(path) + '/' + index;

        if (node[childrenAttribute] !== undefined) {
            return <DirectoryNode
                key={nodeKey}
                onClick={() => onOpenDirectory(index, getDisplayName(node))}
                mimeTypeImage={mimeTypes[getMimeType(node)]}
                name={getDisplayName(node)}
            />;
        } else {
            return <FileNode
                key={nodeKey}
                mimeTypeImage={mimeTypes[getMimeType(node)]}
                name={getDisplayName(node)}
            />;
        }
    };

    render() {
        const { onGoToParentDirectory, path, currentNode, childrenAttribute, loading } = this.props;

        let children = <p>Loading</p>;

        if (!loading) {
            children = (
                <ul>
                    {currentNode[childrenAttribute].map((node, index) => this.nodeToElement(node, index))}
                </ul>
            );
        }

        return (
            <div>
                <div>
                    <h5>
                        <button id="rdb-go-up" onClick={onGoToParentDirectory}>Go up</button>
                        /{path.map(node => node.name).join('/')}</h5>
                </div>
                <div>
                    {children}
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
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })),
    childrenAttribute: PropTypes.string.isRequired,
    mimeTypes: PropTypes.any.isRequired,
    getDisplayName: PropTypes.func,
    getMimeType: PropTypes.func,
    loading: PropTypes.bool,
};

DirectoryBrowser.defaultProps = {
    getDisplayName: node => node.name,
    getMimeType: node => node.mimeType,
};

export default withTreeBrowser(DirectoryBrowser);
