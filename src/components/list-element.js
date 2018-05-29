import React from 'react';
import PropTypes from 'prop-types';
import 'scss/list-element.scss';

import CircleInfo from './circle-info';
import Stars from './stars';

export default class ListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRating: null
    };
  }

  selectRating = (o) => {
    this.setState({
      selectedRating: o
    });
  };

  newSearch = () => {
    this.props.newSearch(this.props.artist);
  };

  render() {
    const {
      artist, title, difficulty, level, rating
    } = this.props;

    const {
      selectedRating
    } = this.state;

    return (
      <div className="list-element-component">
        <div className="logo" />
        <div className="difficulty-level">
          <CircleInfo percent={difficulty * 3.6} string={level.toString()} />
        </div>
        <div className="name">
          <div className="song-title">{title}</div>
          <div className="ratings">
            <Stars
              title={`${rating}/5`}
              selectStar={this.selectRating}
              selected={selectedRating}
              rating={rating / 5}
            />
            <div
              className="performer"
              onClick={this.newSearch}
              onKeyPress={this.newSearch}
              role="button"
              tabIndex={0}
            >
              {artist}
            </div>
          </div>
        </div>
        <div className="actions">...</div>
      </div>
    );
  }
}

ListElement.propTypes = {
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  difficulty: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  newSearch: PropTypes.func
};

ListElement.defaultProps = {
  newSearch: () => {}
};
