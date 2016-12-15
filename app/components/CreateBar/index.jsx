/**
 * @file component CreateBar
 */
import './style.scss';
import React, { PropTypes } from 'react';

const propTypes = {
	onCreate: PropTypes.func.isRequired
}

function CreateBar({ onCreate }) {
	return (
		<div className="create-container">
			<a href="#" className="btn-create-bar" onClick={ () => { onCreate(); } }>
				<span> + </span>
				创建新文档
			</a>
		</div>
	);
}

CreateBar.propTypes = propTypes;

export default CreateBar;
