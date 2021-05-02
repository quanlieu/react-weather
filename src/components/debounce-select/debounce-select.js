import { useState, useMemo } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

export const DebounceSelect = ({ onSearch, debounceTimeout = 500, ...props }) => {
  const [fetching, setFetching] = useState(false);
  const debounceOnSearch = useMemo(() => {
    const loadOptions = async (value) => {
      if (!value) {
        return;
      }
      setFetching(true);
      await onSearch(value);
      setFetching(false);
    };

    return debounce(loadOptions, debounceTimeout);
  }, [onSearch, debounceTimeout]);
  return (
    <Select
      labelInValue
      showSearch
      filterOption={false}
      onSearch={debounceOnSearch}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    />
  );
}