import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import { expandTreePathForUpdate, extendChildrenWithTheirIds, traverseTree } from '../utils/treeUtils';

function withTreeBrowser(WrappedComponent, tree, config, resolver) {
    return class extends Component {
        static propTypes = {
            tree: PropTypes.any,
            config: PropTypes.any,
            resolver: PropTypes.func,
        };

        state = {};

        constructor(props) {
            super(props);

            const derivedTree = tree || props.tree;
            const derivedConfig = config || props.config;
            const derivedResolver = resolver || props.resolver;

            let rootTree;

            // If we pass empty tree or list of nodes, we assume that there is no root-node.
            if (!derivedTree.children) {
                rootTree = {
                    __RDB_NODE_ID__: 'root',
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
                loading: false,
                resolver: derivedResolver,
            };
        };

        componentDidMount() {
            // noinspection JSIgnoredPromiseFromCall
            this.resolveChildren(this.getCurrentNode());
        }

        resolveChildren = async (treeNode) => {
            // No resolver - no fetch
            if (!this.state.resolver) return;
            // Children fetched and no force set - no fetch
            if (treeNode.__RDB_CHILDREN_FETCHED__ && !this.state.config.forceChildrenReFetch) return;

            this.setState({ loading: true });

            const children = extendChildrenWithTheirIds(await this.state.resolver(treeNode));
            const updateObject = {
                __RDB_CHILDREN_FETCHED__: { $set: true },
                children: { $set: children },
            };

            this.setState({
                tree: update(this.state.tree, expandTreePathForUpdate([ ...this.state.path ], updateObject, 'root')),
                loading: false,
            });
        };

        getCurrentNode = (path = false) => {
            path = path || this.state.path;
            return traverseTree(this.state.tree, [ ...path ], this.state.config.directoryMimeType);
        };

        goToParentDirectory = () => {
            this.setState({ path: this.state.path.slice(0, -1) });
        };

        openDirectory = (id, name) => {
            const newPath = [ ...this.state.path, {
                id,
                name,
            } ];

            this.setState({ path: newPath });

            // noinspection JSIgnoredPromiseFromCall
            this.resolveChildren(this.getCurrentNode(newPath));
        };

        render() {
            const { state } = this;
            console.log(this.getCurrentNode());
            const handles = {
                loading: state.loading,
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
