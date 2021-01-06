import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ErrorsList from '../../components/ErrorsList';

configure({
  adapter: new Adapter(),
});

const setUp = errors => mount(
  <ErrorsList errorsInfo={errors} />,
);

describe('Tests for Sidebar component - not Signed In User', () => {
  let errorsList;
  let errorsListComponent;

  beforeAll(() => {
    errorsList = ['Error 1', 'Error 2', 'Error 3'];
    errorsListComponent = setUp(errorsList);
  });

  test('First version of component has 3 children', () => {
    expect(errorsListComponent.find('li').length).toBe(3);
  });

  test('Second version component has 4 children after add an element', () => {
    errorsList.push('Error 4');
    errorsListComponent.setProps({
      errorsInfo: errorsList,
    });
    expect(errorsListComponent.find('li').length).toBe(4);
    expect(errorsListComponent.find('li').last().text()).toBe('Error 4');
  });
});
