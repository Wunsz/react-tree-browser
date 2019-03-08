import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DirectoryBrowser from './DirectoryBrowser';

configure({ adapter: new Adapter() });

describe('<DirectoryBrowser />', () => {
    const TEST_TREE = {
        id1: {
            name: 'Directory One',
            mimeType: 'directory',
            children: {
                id2: {
                    name: 'Directory Two',
                    mimeType: 'directory',
                },
                id3: {
                    name: 'Directory Three',
                    mimeType: 'directory',
                },
                id4: {
                    name: 'Some image',
                    mimeType: 'image',
                },
                id5: {
                    name: 'Some other image',
                    mimeType: 'image',
                },
            },
        },
        id6: {
            name: 'Directory Four',
            mimeType: 'directory',
        },
        id7: {
            name: 'Directory Five',
            mimeType: 'directory',
        },
    };

    const DEFAULT_CONFIG = {
        mimeTypes: {
            directory: null,
            image: null,
        },
        directoryMimeType: 'directory',
        childrenAttribute: 'children',
    };

    it('renders root path', () => {
        const browser = mount(
            <DirectoryBrowser tree={TEST_TREE} config={DEFAULT_CONFIG} />,
        );

        const entries = browser.find('li');

        expect(entries.length).toBe(3);

        browser.unmount();
    });

    it('renders root path even if tree has given root', () => {
        const testTree = {
            name: 'WHATEVER TEXT',
            mimeType: 'directory',
            children: {...TEST_TREE},
        };

        const browser = mount(
            <DirectoryBrowser tree={testTree} config={DEFAULT_CONFIG} />,
        );

        const entries = browser.find('li');

        expect(entries.length).toBe(3);

        browser.unmount();
    });

    it('renders subdirectory after click', () => {
        const browser = mount(
            <DirectoryBrowser tree={TEST_TREE} config={DEFAULT_CONFIG} />,
        );

        browser.find('li.rdb-directory').first().simulate('click');

        expect(browser.find('li').length).toBe(4);
        expect(browser.find('li.rdb-directory').length).toBe(2);
        expect(browser.find('li.rdb-file').length).toBe(2);

        browser.unmount();
    });

    it('renders root path again after traversing down and then back again', () => {
        const browser = mount(
            <DirectoryBrowser tree={TEST_TREE} config={DEFAULT_CONFIG} />,
        );

        browser.find('li.rdb-directory').first().simulate('click');
        browser.find('#rdb-go-up').simulate('click');

        expect(browser.find('li.rdb-directory').length).toBe(3);

        browser.unmount();
    });
});
