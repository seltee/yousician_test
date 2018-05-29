import React from 'react';
import PropTypes from 'prop-types';
import 'scss/stars.scss';

const stars = [1, 2, 3, 4, 5];

export default class ListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverStar: 0
    };
  }

  hoverStar(o) {
    this.setState({
      hoverStar: o
    });
  }

  selectStar(o) {
    this.props.selectStar(o);
  }

  render() {
    const {
      title, selected, rating
    } = this.props;
    const {
      hoverStar
    } = this.state;

    const starActiveSize = rating * 100;

    return (
      <div className="stars-component" title={title}>
        <div className="grey-stars">
          {
            stars.map((o) => (<div
              className="star"
              key={o}
              onMouseEnter={() => this.hoverStar(o)}
              onClick={() => this.selectStar(o)}
              onKeyPress={() => this.selectStar(o)}
              role="button"
              tabIndex={0}
            />))
          }
        </div>
        <div className={`normal-stars ${selected ? ' rating-selected' : ''}`} style={{ width: `${starActiveSize}px` }}>
          {
            stars.map((o) => (<div
              key={o}
              className="star-active"
            />))
          }
        </div>
        <div className={`selected-stars ${selected ? ' rating-selected' : ''}`}>
          {
            stars.map((o, i) => (<div
              className={`star-user ${hoverStar > i ? 'hover' : ''} ${selected > i ? 'selected' : ''}`}
              key={o}
            />))
          }
        </div>
      </div>
    );
  }
}

ListElement.propTypes = {
  title: PropTypes.string,
  selected: PropTypes.number,
  rating: PropTypes.number,
  selectStar: PropTypes.func.isRequired
};

ListElement.defaultProps = {
  title: '',
  selected: null,
  rating: 0
};
