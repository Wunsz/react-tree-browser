import React, { Component } from 'react';

import PhotoImage from './assets/material-photo.svg';
import DirectoryImage from './assets/material-folder.svg';

import { TreeBrowser } from 'react-tree-browser';

const NODES = {
    root: [
        {
            id: 'id1',
            name: 'Directory One',
            mimeType: 'directory',
        },
        {
            id: 'id6',
            name: 'Directory Four',
            mimeType: 'directory',
        },
        {
            id: 'id7',
            name: 'Directory Five',
            mimeType: 'directory',
        },
    ],
    id1: [
        {
            id: 'id2',
            name: 'Directory Two',
            mimeType: 'directory',
        },
        {
            id: 'id3',
            name: 'Directory Three',
            mimeType: 'directory',
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

function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

async function fetchDirectory(node) {
    await delay(1000);

    if (NODES[node.id]) {
        return NODES[node.id].map(node => {
            const extendedNode = { ...node };

            if (node.mimeType === 'directory') {
                extendedNode.children = [];
            }

            return extendedNode;
        });
    } else {
        return [];
    }
}

export default class Example2 extends Component {
    render() {
        const initialTree = {
            id: 'root',
            children: [],
        };

        const config = {
            childrenAttribute: 'children',
            resolver: fetchDirectory,
        };

        const mimeTypes = {
            directory: DirectoryImage,
            image: PhotoImage,
        };

        return (
            <div>
                <h2> Example 2 - Dynamically loaded tree </h2>
                <TreeBrowser tree={initialTree} config={config} mimeTypes={mimeTypes} />
            </div>
        );
    }
}
