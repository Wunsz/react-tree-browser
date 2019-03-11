import React, { Component } from 'react';

import PhotoImage from './assets/material-photo.svg';
import DirectoryImage from './assets/material-folder.svg';

import DirectoryBrowser from 'react-directory-browser';

export default class Example1 extends Component {
    render() {
        const tree = [
            {
                name: 'Directory One',
                mimeType: 'directory',
                children: [
                    {
                        name: 'Directory Two',
                        mimeType: 'directory',
                        children: [],
                    },
                    {
                        name: 'Directory Three',
                        mimeType: 'directory',
                        children: [],
                    },
                    {
                        name: 'Some image',
                        mimeType: 'image',
                    },
                    {
                        name: 'Some other image',
                        mimeType: 'image',
                    },
                ],
            },
            {
                name: 'Directory Four',
                mimeType: 'directory',
                children: [],
            },
            {
                name: 'Directory Five',
                mimeType: 'directory',
                children: [],
            },
        ];

        const config = {
            mimeTypes: {
                directory: DirectoryImage,
                image: PhotoImage,
            },
            directoryMimeType: 'directory',
            childrenAttribute: 'children',
        };

        return (
            <div>
                <h2> Example 1 - Default, preloaded tree </h2>
                <DirectoryBrowser tree={tree} config={config} />
            </div>
        );
    }
}
