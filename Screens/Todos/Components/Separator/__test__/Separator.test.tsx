import React from 'react';
import {Separator} from '../Separator';
import renderer from 'react-test-renderer';

describe('AddNewItem tests', () => {
  it('should render component', async () => {
    const tree = renderer.create(<Separator />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
