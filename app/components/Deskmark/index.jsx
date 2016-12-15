/**
 * @file component Deskmark
 */
import './style.scss';
import React from 'react';
import uuid from 'uuid';

import CreateBar from '../CreateBar';
import List from '../List';
import ListItem from '../ListItem';
import ItemShowLayer from '../ItemShowLayer';
import ItemEditor from '../ItemEditor';


class Deskmark extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			selectId: null,
			editing: false
		};
		this.createItem = this.createItem.bind(this);
		this.saveItem = this.saveItem.bind(this);
		this.cancelItem = this.cancelItem.bind(this);
		this.editItem = this.editItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.selectItem = this.selectItem.bind(this);
	}
	//点击新建按钮新建item操作
	createItem() {
		this.setState({
			selectId: null,
			editing: true
		});
	}
	
	//点击发布按钮保存操作
	saveItem(item) {
		let items = this.state.items;
		if (!item.id) {
			item.id = uuid.v4();
			item.time = new Date().getTime();
			items = [...items, item];	
		}else {
			items.forEach((val, idx) => {
				if (val.id === item.id) {
					val.title = item.title;
					val.content = item.content;
				}
			});
		}
		this.setState({
			items: items,
			selectId: item.id,
			editing: false
		});
	}
	
	//点击取消按钮取消新建item或已有item的编辑
	cancelItem() {
		const items = this.state.items;
		let selectId = this.state.selectId;
		this.setState({
			items: items,
			selectId: selectId,
			editing: false
		});
	}

	//点击编辑按钮编辑操作
	editItem(id) {
		this.setState({
			editing: true
		});
	}

	//点击删除按钮删除操作
	deleteItem(id) {
		const items = this.state.items;
		items.forEach((val, idx) => {
			if (val.id === id) {
				items.splice(idx, 1);
			}
		});
		this.setState({
			items: items,
			selectId: null,
			editing: false
		});
	}

	//选择ListItem按钮的选择操作
	selectItem(id) {
		if (this.state.selectId === id) {
			return;
		}
		this.setState({
			selectId: id,
			editing: false
		});
	}

	render() {
		const { items, selectId, editing } = this.state;
		//选出当前被选中的文章
		let selectedItem = selectId && items.find((item) => {
			return item.id === selectId;
		});
		//根据editing状态决定显示ItemShowLayer还是ItemEditor
		let mainPart = editing ? <ItemEditor item={ selectedItem } onSave={ this.saveItem } onCancel={ this.cancelItem }/> 
								: <ItemShowLayer item={ selectedItem } onEdit={ this.editItem } onDelete={ this.deleteItem } />;
		return (
			<section className="deskmark-component">
				<div className="container">
					<div className="left-container">
						<CreateBar onCreate={ this.createItem }/>
						<List items={ items } onSelect={ this.selectItem } />
					</div>
					<div className="right-container">
						{ mainPart }
					</div>
				</div>
			</section>
		);
	}

}

export default Deskmark;
