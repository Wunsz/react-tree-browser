import React, { Component } from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import waitUntil from 'async-wait-until';

import withTreeBrowser from './withTreeBrowser';

configure({ adapter: new Adapter() });

function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

class Awaiter {
    ready = false;

    isReady = async () => {
        await waitUntil(() => this.ready);
        this.ready = false;
        return this;
    };

    makeReady = () => {
        this.ready = true;
        return this;
    };
}

describe('async withTreeBrowser()', () => {
    const TREE_NODES = {
        root: [
            {
                id: 'id1',
                name: 'Directory One',
                mimeType: 'directory',
                children: [],
            },
            {
                id: 'id6',
                name: 'Directory Four',
                mimeType: 'directory',
                children: [],
            },
            {
                id: 'id7',
                name: 'Directory Five',
                mimeType: 'directory',
                children: [],
            },
        ],
        id1: [
            {
                id: 'id2',
                name: 'Directory Two',
                mimeType: 'directory',
                children: [],
            },
            {
                id: 'id3',
                name: 'Directory Three',
                mimeType: 'directory',
                children: [],
            },
            {
                id: 'id4',
                name: 'Some image',
                mimeType: 'image',
            },
            {
                id: 'id5',
                name: 'Some other image',
                mimeType: 'image',
            },
        ],
        id6: [],
        id7: [],
    };

    const resolverWithAwaiter = (awaiter, mock = () => null) => {
        return async (node) => {
            await delay(30);

            setTimeout(awaiter.makeReady, 5);
            mock();

            return TREE_NODES[node.id] || [];
        };
    };

    const setUp = (otherConfig = {}) => {
        const mock = jest.fn();
        const awaiter = new Awaiter();
        const resolver = resolverWithAwaiter(awaiter, mock);

        return {
            TreeBrowserComponent: withTreeBrowser(Component),
            tree: {
                id: 'root',
                children: [],
            },
            awaiter: awaiter,
            config: { resolver, ...otherConfig },
            mock: mock,
        };
    };

    it('fetches data if root node is not fetched', async () => {
        const { TreeBrowserComponent, tree, config, awaiter } = setUp();

        const wrapper = shallow(<TreeBrowserComponent tree={tree} config={config} />);
        await awaiter.isReady();

        expect(wrapper.props().currentNode.id).toBe('root');
        expect(wrapper.props().currentNode.children).toEqual(TREE_NODES.root);
        expect(wrapper.props().tree).toEqual({
            id: 'root',
            children: TREE_NODES.root,
        });
    });

    it('it fetches data of children node if not fetched', async () => {
        const { TreeBrowserComponent, tree, config, awaiter } = setUp();

        const wrapper = shallow(<TreeBrowserComponent tree={tree} config={config} />);
        await awaiter.isReady();

        wrapper.props().onOpenNode(0, 'id1');
        await awaiter.isReady();

        expect(wrapper.props().currentNode.id).toBe('id1');
        expect(wrapper.props().currentNode.children).toEqual(TREE_NODES.id1);
        expect(wrapper.props().tree).toEqual({
            id: 'root',
            children: [
                {
                    id: 'id1',
                    name: 'Directory One',
                    mimeType: 'directory',
                    children: TREE_NODES.id1,
                },
                {
                    id: 'id6',
                    name: 'Directory Four',
                    mimeType: 'directory',
                    children: [],
                },
                {
                    id: 'id7',
                    name: 'Directory Five',
                    mimeType: 'directory',
                    children: [],
                },
            ],
        });
    });

    it('it doesn\'t re-fetch data of children node if already fetched', async () => {
        const { TreeBrowserComponent, tree, config, awaiter, mock } = setUp();

        const wrapper = shallow(<TreeBrowserComponent tree={tree} config={config} />);
        await awaiter.isReady();

        expect(mock).toHaveBeenCalledTimes(1);

        // Open child and fetch it's data
        wrapper.props().onOpenNode(0, 'id1');
        await awaiter.isReady();

        expect(mock).toHaveBeenCalledTimes(2);

        // Go up
        wrapper.props().onGoToParent();
        await delay(10);

        // Open child again
        wrapper.props().onOpenNode(0, 'id1');

        expect(mock).toHaveBeenCalledTimes(2);
        expect(wrapper.props().currentNode.id).toBe('id1');
        expect(wrapper.props().currentNode.children).toEqual(TREE_NODES.id1);
        expect(wrapper.props().tree).toEqual({
            id: 'root',
            children: [
                {
                    id: 'id1',
                    name: 'Directory One',
                    mimeType: 'directory',
                    children: TREE_NODES.id1,
                },
                {
                    id: 'id6',
                    name: 'Directory Four',
                    mimeType: 'directory',
                    children: [],
                },
                {
                    id: 'id7',
                    name: 'Directory Five',
                    mimeType: 'directory',
                    children: [],
                },
            ],
        });
    });

    it('it does re-fetch data of children node even if already fetched if flag is set', async () => {
        const { TreeBrowserComponent, tree, config, awaiter, mock } = setUp({ forceChildrenReFetch: true });

        const wrapper = shallow(<TreeBrowserComponent tree={tree} config={config} />);
        await awaiter.isReady();

        expect(mock).toHaveBeenCalledTimes(1);

        // Open child and fetch it's data
        wrapper.props().onOpenNode(0, 'id1');
        await awaiter.isReady();

        expect(mock).toHaveBeenCalledTimes(2);

        // Go up
        wrapper.props().onGoToParent();
        await delay(10);

        // Open child again
        wrapper.props().onOpenNode(0, 'id1');
        await awaiter.isReady();

        expect(mock).toHaveBeenCalledTimes(3);
        expect(wrapper.props().currentNode.id).toBe('id1');
        expect(wrapper.props().currentNode.children).toEqual(TREE_NODES.id1);
        expect(wrapper.props().tree).toEqual({
            id: 'root',
            children: [
                {
                    id: 'id1',
                    name: 'Directory One',
                    mimeType: 'directory',
                    children: TREE_NODES.id1,
                },
                {
                    id: 'id6',
                    name: 'Directory Four',
                    mimeType: 'directory',
                    children: [],
                },
                {
                    id: 'id7',
                    name: 'Directory Five',
                    mimeType: 'directory',
                    children: [],
                },
            ],
        });
    });
});
