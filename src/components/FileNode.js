import React from 'react';
import PropTypes from 'prop-types';

const FileNode = ({ name, mimeTypeImage }) => (
    <li className="rdb-node rdb-file">
        {mimeTypeImage ? <img src={mimeTypeImage} alt={name} /> : null}
        <span>{name}</span>
    </li>
);

FileNode.propTypes = {
    name: PropTypes.string.isRequired,
    mimeTypeImage: PropTypes.any,
};

export default FileNode;
