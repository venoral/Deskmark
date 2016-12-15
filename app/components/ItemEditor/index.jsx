/**
 * @file component ItemEditor
 */
import './style.scss';
import React, { PropTypes } from 'react';

const propTypes = {
	item: PropTypes.object,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
};

class ItemEditor extends React.Component {
	render() {
		const { item, onSave, onCancel } = this.props;
		let save = () => {
			onSave({
				id: item ? item.id : '',
				title: this.refs.title.value,
				content: this.refs.content.value,
				time: item ? item.time : ''
			});
		};
		
		return (
			<div className="item-editor-component">
				<div className="control-area">
					<button onClick={ save } className="btn btn-success">发布</button>
					<button onClick={ () => { onCancel(); } } className="btn">取消</button>
				</div>
				<div className="edit-area">
					<input placeholder="请填写标题" ref="title" defaultValue={ item ? item.title : '' } />
					<textarea placeholder="支持markdown" ref="content" defaultValue={ item ? item.content : '' }/>
				</div>
			</div>
		);
	}
}

ItemEditor.propTypes = propTypes;

export default ItemEditor;