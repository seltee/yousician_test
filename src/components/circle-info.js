import React from 'react';
import PropTypes from 'prop-types';

import 'scss/circle-info.scss';

export default class ListElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      percent, string
    } = this.props;

    return (
      <div className="circle-info-component">
        <div className="circle" />
        <div className="circle-active">
          <div
            style={{
              transform: `rotate(${percent}deg)`
            }}
          >
            <div
              style={{
                transform: `rotate(${-percent}deg)`
              }}
            />
          </div>
        </div>
        <div className="title">{string}</div>
      </div>
    );
  }
}

ListElement.propTypes = {
  percent: PropTypes.number.isRequired,
  string: PropTypes.string
};

ListElement.defaultProps = {
  string: ''
};
