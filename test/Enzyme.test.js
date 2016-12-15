import React from 'react';
import {
	expect
} from 'chai';
import List from '../app/components/List';
import ListItem from '../app/components/ListItem';
import ItemShowLayer from '../app/components/ItemShowLayer';
import Deskmark from '../app/components/Deskmark';
import {
	shallow,
	mount
} from 'Enzyme';

describe("Testing all the SFC using Enzyme", () => {
	//添加一些测试数据
	const testData = [{
		id: "6c84fb90-12c4-llel-840d-7b25c5ee775a",
		title: "Hello",
		content: "# testing markdown",
		time: 1458030208359
	}, {
		id: "6c84fb90-12c4-llel-840d-7b25c5ee775b",
		title: "Hello2",
		content: "# Hello world",
		time: 1458030208359
	}];
	//第一个测试用例
	it("test List component using Enzyme", () => {
		let list = shallow(<List items={ testData } />);
		//直接查找用testData渲染以后应该有的ListItem的数量，结果应该和testData的长度一样
		expect(list.find(ListItem).length).to.equal(testData.length);
	});
	it("test ListItem component using Enzyme", () => {
		let listItem = shallow(<ListItem item={ testData[0] } />);
		//测试item-title和item-time的值是否等于传入的data
		expect(listItem.find('.title').text()).to.equal(testData[0].title);
		expect(listItem.find('.time').text()).to.equal(testData[0].time.toString());
		expect(listItem.hasClass('list-group-item')).to.be.true;
	});
	it("test ItemShowLayer with no data using Enzyme", () => {
		let itemShowLayer = shallow(<ItemShowLayer item={ null } />);
		expect(itemShowLayer.find('.info').length).to.equal(1);
		expect(itemShowLayer.hasClass('no-select-container'));
	});
	it("test ItemShowLayer with data using Enzyme", () => {
		let itemShowLayer = shallow(<ItemShowLayer item={ testData[0] } />);
		expect(itemShowLayer.find('h2').text()).to.equal(testData[0].title);
		expect(itemShowLayer.hasClass('item-show-layer-component'));
	});
	//测试交互操作
	it("test Deskmark create one post and delete a post", () => {
		//使用mount方法挂载DOM结构
		let deskmark = mount(<Deskmark />);
		//单击新建条目按钮
		deskmark.find('.btn-create-bar').simulate('click');
		//Editor组件应该出现，showLayer组件应该消失，同时左侧列表条目应该为空
		expect(deskmark.find('.item-editor-component').length).to.equal(1);
		expect(deskmark.find('.item-show-layer-component').length).to.equal(0);
		expect(deskmark.find('.list-group-item').length).to.equal(0);
		//在editor的input和textarea中填写一些测试数据
		let input = deskmark.find('input');
		input.node.value = 'my new title';
		input.simulate('change', input);
		let textarea = deskmark.find('textarea');
		textarea.node.value = '# looks good';
		textarea.simulate('change', textarea);
		//单击发布按钮
		deskmark.find('.btn-success').simulate('click');

		//showLayer组件应该出现，editor组件消失，同时左侧列表条目应该为1
		expect(deskmark.find('.item-show-layer-component').length).to.equal(1);
		expect(deskmark.find('.item-editor-component').length).to.equal(0);
		expect(deskmark.find('.list-group-item').length).to.equal(1);
		//ListItem第一个条目应该和填写的标题相同
		expect(deskmark.find('.list-group-item').first().find('.title').text()).to.equal('my new title');
		//选择列表第一条
		deskmark.find('.list-group-item').first().simulate('click');
		//showLayer组件的h2元素应该有相同的标题
		expect(deskmark.find('.item-show-layer-component h2').text()).to.equal('my new title');
		//单击删除按钮
		deskmark.find('.btn-danger').simulate('click');
		//ListItem组件应该为空
		expect(deskmark.find('.list-group-item').length).to.equal(0);
	});
});