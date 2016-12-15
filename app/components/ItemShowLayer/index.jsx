/**
 * @file component ItemShowLayer
 */
import './style.scss';
import marked from 'marked';
import React, { PropTypes } from 'react';

const propTypes = {
	item: PropTypes.object,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}

function ItemShowLayer({ item, onEdit, onDelete }) {
	//如果没有传入item，返回一些静态的提示
	if (!item || !item.id) {
		return (
			<div className="no-select-container">
				<div className="info">
					请选择左侧列表里面的文章
				</div>
			</div>
		);
	}
	//将Markdown转换成HTML，注意渲染HTML代码时使用了描述过的JSX转义写法dangerouslySetInnerHTML
	let content = marked(item.content);
	return (
		<div className="item-show-layer-component">
			<div className="control-area">
				<button onClick={ () => { onEdit(item.id); } } className="btn">编辑</button>
				<button onClick={ () => { onDelete(item.id); } } className="btn btn-danger">删除</button>
			</div>
			<h2>{ item.title }</h2>
			<div className="item-text">
				<div dangerouslySetInnerHTML={ { __html: content } } />
			</div>
		</div>
	);	
}

ItemShowLayer.propTypes = propTypes;

export default ItemShowLayer;