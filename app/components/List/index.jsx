/**
 * @file component List
 */
import './style.scss';
import ListItem from '../ListItem';
import React, { PropTypes } from 'react';

const propTypes = {
	items: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired
}

function List({ items, onSelect }) {
	//循环插入子组件
	const itemsContent = items.map(
		item => (
			<ListItem 
				item={ item }
				key={ item.id }
				onSelect={ onSelect }
			/>
		)
	);
	return (
		<div className="list-component">
			{ itemsContent }
		</div>
	);
}

List.propTypes = propTypes;

export default List;