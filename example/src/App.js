import React, { Component } from 'react';
import Example1 from './Example1';
import Example2 from './Example2';

export default class App extends Component {
    render() {
        return (
            <div>
                <Example1 />
                <hr />
                <Example2 />
            </div>
        );
    }
}
