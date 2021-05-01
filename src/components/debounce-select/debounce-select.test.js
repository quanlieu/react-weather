import { render } from '@testing-library/react'
import { DebounceSelect } from './debounce-select';

describe('DebounceSelect component', () => {
  test('Should render', () => {
    const wrapper = render(<DebounceSelect />)
    expect(wrapper).toMatchSnapshot();
  })
});
