/**
 * @file component Item
 */
import './style.scss';
import React, { PropTypes } from 'react';

const propTypes = {
	item: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired
}

function ListItem({ item, onSelect }) {
	return (
		<a className="list-group-item" onClick={ () => { onSelect(item.id); } }>
			<span className="title">
				{ item.title }
			</span>
			<span className="time">
				{ item.time }
			</span>
		</a>
	);
}

ListItem.propTypes = propTypes;

export default ListItem;