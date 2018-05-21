import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount, render, configure} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import ReactDOM from 'react-dom';
import App from './components/App';
import Header from './components/common/Header';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('Basic Functionality', () => {
  
  // it('renders without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(<App />, div);
  //   ReactDOM.unmountComponentAtNode(div);
  // });

  it('cmon', () => {
    expect(1 + 2).toBe(3);
  })
})

describe('Header', () =>{
  // check header
  it('header defined', () => {
    expect(Header).toBeDefined();
  })

  // renders
  it('header renders', () => {
    expect(shallow(<Header/>)).toMatchSnapshot();
  });

  // sign in button
  it('header has sign in', () => {
    expect(shallow(<Header/>).find('Link[to="/signin"]').length).toEqual(1);
  });

  // random lever
  it('random lever toggles', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper.state('random')).toBe(false);
    wrapper.find('img[alt="Lever"]').last().simulate('click');
    expect(wrapper.state('random')).toBe(true);
    wrapper.find('img[alt="Lever"]').last().simulate('click');
    expect(wrapper.state('random')).toBe(false);
  });
})