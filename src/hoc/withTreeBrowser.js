import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import { expandTreePathForUpdate, pathAsString, traverseTree } from '../utils/treeUtils';

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
            const derivedConfig = {
                resolver: null,
                childrenAttribute: 'children',
                forceChildrenReFetch: false,
                ...(!config ? props.config : config),
            };

            let rootTree;

            // If we pass empty tree or list of nodes, we assume that there is no root-node.
            if (!derivedTree[derivedConfig.childrenAttribute]) {
                rootTree = { [derivedConfig.childrenAttribute]: derivedTree };
            } else {
                rootTree = derivedTree;
            }

            // noinspection JSPotentiallyInvalidUsageOfThis
            this.state = {
                path: [],
                tree: rootTree,
                loading: false,
                fetchedPaths: [],
                config: derivedConfig,
            };
        };

        componentDidMount() {
            // noinspection JSPotentiallyInvalidUsageOfThis,JSIgnoredPromiseFromCall
            this.resolveChildren(this.state.path);
        }

        resolveChildren = async (path) => {
            // No resolver - no fetch
            if (!this.state.config.resolver) return;
            // Children fetched and no force set - no fetch
            if (this.state.fetchedPaths.includes(pathAsString(path)) && !this.state.config.forceChildrenReFetch) return;

            this.setState({ loading: true });

            const treeNode = this.getCurrentNode(path);
            const children = await this.state.config.resolver(treeNode, path);
            const updateObject = { [this.state.config.childrenAttribute]: { $set: children } };
            const updateSpec = expandTreePathForUpdate([ ...path ], updateObject, this.state.config.childrenAttribute);

            this.setState({
                tree: update(this.state.tree, updateSpec),
                fetchedPaths: [ ...this.state.fetchedPaths, pathAsString(path) ],
                loading: false,
            });
        };

        getCurrentNode = (path = false) => {
            path = path || this.state.path;
            return traverseTree(this.state.tree, [ ...path ], this.state.childrenAttribute);
        };

        goToParentDirectory = () => {
            this.setState({ path: this.state.path.slice(0, -1) });
        };

        openDirectory = (index, metaData) => {
            const newPath = [ ...this.state.path, {
                index,
                metaData,
            } ];

            this.setState({ path: newPath });

            // noinspection JSIgnoredPromiseFromCall
            this.resolveChildren(newPath);
        };

        render() {
            const { state } = this;

            // noinspection JSPotentiallyInvalidUsageOfThis
            const handles = {
                tree: state.tree,
                loading: state.loading,
                path: [ ...state.path ],
                currentNode: this.getCurrentNode(),
                childrenAttribute: state.config.childrenAttribute,
                onGoToParentDirectory: this.goToParentDirectory,
                onOpenDirectory: this.openDirectory,
            };

            return <WrappedComponent {...this.props} {...handles} />;
        }
    };
}

export default withTreeBrowser;
