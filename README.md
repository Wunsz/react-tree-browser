# react-directory-browser

> React component allowing to browse directory-like structure

[![NPM](https://img.shields.io/npm/v/react-directory-browser.svg)](https://www.npmjs.com/package/react-directory-browser) [![pipeline status](https://gitlab.com/codeinthecup/react-directory-browser/badges/master/pipeline.svg)](https://gitlab.com/codeinthecup/react-directory-browser/commits/master) [![coverage report](https://gitlab.com/codeinthecup/react-directory-browser/badges/master/coverage.svg)](https://gitlab.com/codeinthecup/react-directory-browser/commits/master) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 

`react-directory-browser` is a library that allows the user to browse a directory structure and perform actions on selected directories and files.

## Install

```bash
npm install --save react-directory-browser
```
or
```bash
yarn add react-directory-browser
```

## Usage

```jsx
import React, { Component } from 'react'

import DirectoryBrowser from 'react-directory-browser'

class Example extends Component {
  render () {
    return (
      <DirectoryBrowser />
    )
  }
}
```

## License

MIT © [Bartosz 'Wunsz' Jabłoński | Code in the Cup](https://codeinthecup.pl/)
