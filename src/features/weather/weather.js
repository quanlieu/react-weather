import { Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Divider } from 'antd';

import { searchLocationsByName, selectLocations } from './weather-slice';
import { DebounceSelect } from '../../components/debounce-select/debounce-select'

export const Weather = props => {
  const locations = useSelector(selectLocations);
  const dispatch = useDispatch();
  const handleSearch = useCallback(
    value => dispatch(searchLocationsByName(value)),
    [dispatch],
  );

  return (
    <Fragment>
      <Row>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <DebounceSelect
            placeholder="Select"
            onSearch={handleSearch}
            options={locations}
            dropdownMatchSelectWidth={false}
            style={{
              width: '100%',
            }}
          />
        </Col>
      </Row>
      <Divider orientation="left" />
      <Row justify="center" gutter={[{ xs: 8, md: 12, xl: 16}, { xs: 8, md: 12, xl: 16}]}>
        <Col xs={12} md={8} xl={4}><div style={{backgroundColor: "lightblue"}}>Col</div></Col>
        <Col xs={12} md={8} xl={4}><div style={{backgroundColor: "lightblue"}}>Col</div></Col>
        <Col xs={12} md={8} xl={4}><div style={{backgroundColor: "lightblue"}}>Col</div></Col>
        <Col xs={12} md={8} xl={4}><div style={{backgroundColor: "lightblue"}}>Col</div></Col>
        <Col xs={12} md={8} xl={4}><div style={{backgroundColor: "lightblue"}}>Col</div></Col>
        <Col xs={12} md={8} xl={4}><div style={{backgroundColor: "lightblue"}}>Col</div></Col>
      </Row>
    </Fragment>
  )
}
