import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TreeBrowser from './TreeBrowser';

configure({ adapter: new Adapter() });

describe('<TreeBrowser />', () => {
    const TEST_TREE = [
        {
            id: 'id1',
            name: 'Directory One',
            mimeType: 'directory',
            children: [
                {
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
        },
        {
            id: 'id6',
            name: 'Directory Four',
            mimeType: 'directory',
            children: [],
        },
        {
            id: 'id6',
            name: 'Directory Five',
            mimeType: 'directory',
            children: [],
        },
    ];

    const DEFAULT_CONFIG = { childrenAttribute: 'children' };

    const DEFAULT_COMPONENT_CONFIG = {
        mimeTypes: {
            directory: null,
            image: null,
        },
        directoryMimeType: 'directory',
        idAttribute: 'id',
    };

    it('renders root path', () => {
        const browser = mount(
            <TreeBrowser tree={TEST_TREE} config={DEFAULT_CONFIG} {...DEFAULT_COMPONENT_CONFIG} />,
        );

        const entries = browser.find('li');

        expect(entries.length).toBe(3);

        browser.unmount();
    });

    it('renders root path even if tree has given root', () => {
        const testTree = {
            id: 'root',
            name: 'WHATEVER TEXT',
            mimeType: 'directory',
            children: [ ...TEST_TREE ],
        };

        const browser = mount(
            <TreeBrowser tree={testTree} config={DEFAULT_CONFIG} {...DEFAULT_COMPONENT_CONFIG} />,
        );

        const entries = browser.find('li');

        expect(entries.length).toBe(3);

        browser.unmount();
    });

    it('renders subdirectory after click', () => {
        const browser = mount(
            <TreeBrowser tree={TEST_TREE} config={DEFAULT_CONFIG} {...DEFAULT_COMPONENT_CONFIG} />,
        );

        browser.find('li.rdb-directory').first().simulate('click');

        expect(browser.find('li').length).toBe(4);
        expect(browser.find('li.rdb-directory').length).toBe(2);
        expect(browser.find('li.rdb-file').length).toBe(2);

        browser.unmount();
    });

    it('renders root path again after traversing down and then back again', () => {
        const browser = mount(
            <TreeBrowser tree={TEST_TREE} config={DEFAULT_CONFIG} {...DEFAULT_COMPONENT_CONFIG} />,
        );

        browser.find('li.rdb-directory').first().simulate('click');
        browser.find('#rdb-go-up').simulate('click');

        expect(browser.find('li.rdb-directory').length).toBe(3);

        browser.unmount();
    });
});
