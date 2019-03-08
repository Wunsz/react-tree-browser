import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { traverseTree } from '../utils/treeUtils';

function withTreeBrowser(WrappedComponent, tree, config) {
    return class extends Component {
        static propTypes = {
            tree: PropTypes.any,
            config: PropTypes.any,
        };

        state = {};

        constructor(props) {
            super(props);

            const derivedTree = tree || props.tree;
            const derivedConfig = config || props.config;

            let rootTree;

            // If we pass empty tree or list of nodes, we assume that there is no root-node.
            if (!derivedTree.children) {
                rootTree = {
                    name: 'root',
                    mimeType: derivedConfig.directoryMimeType,
                    children: derivedTree,
                };
            } else {
                rootTree = derivedTree;
            }

            // noinspection JSPotentiallyInvalidUsageOfThis
            this.state = {
                config: derivedConfig,
                tree: rootTree,
                path: [],
            };
        };

        getCurrentNode = () => {
            return traverseTree(this.state.tree, [ ...this.state.path ], this.state.config.directoryMimeType);
        };

        goToParentDirectory = () => {
            this.setState({ path: this.state.path.slice(0, -1) });
        };

        openDirectory = (id, name) => {
            this.setState({
                path: [ ...this.state.path, {
                    id,
                    name,
                } ],
            });
        };

        render() {
            const { state } = this;

            const handles = {
                path: [ ...state.path ],
                currentNode: this.getCurrentNode(),
                mimeTypes: state.config.mimeTypes,
                directoryMimeType: state.config.directoryMimeType,
                onGoToParentDirectory: this.goToParentDirectory,
                onOpenDirectory: this.openDirectory,
            };

            return <WrappedComponent {...this.props} {...handles} />;
        }
    };
}

export default withTreeBrowser;
