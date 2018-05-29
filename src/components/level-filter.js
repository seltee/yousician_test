import React from 'react';
import PropTypes from 'prop-types';

import 'scss/level-filter.scss';

const levels = [
  {
    from: 1,
    to: 3
  },
  {
    from: 4,
    to: 6
  },
  {
    from: 7,
    to: 12
  },
  {
    from: 13,
    to: 18
  }
];

export default class LevelFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  selectLevel = (level) => {
    if (this.isLevelSet(level)) {
      const out = [];
      this.props.selectedLevels.forEach((o) => {
        if (o.from !== level.from) {
          out.push(o);
        }
      });
      this.props.selectLevels(out);
    } else {
      this.props.selectLevels(this.props.selectedLevels.concat(level));
    }
  };

  isLevelSet = (o) => {
    const { selectedLevels } = this.props;
    for (let i = 0; i < selectedLevels.length; i++) {
      if (selectedLevels[i].from === o.from) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <div className="level-filter-component">
        <div>Level: </div>
        <div className="levels">
          {
            levels.map((o) => (
              <div
                key={o.from}
                className={this.isLevelSet(o) ? 'selected' : null}
                onClick={() => this.selectLevel(o)}
                onKeyPress={() => this.selectLevel(o)}
                role="button"
                tabIndex={0}
              >
                {o.from} - {o.to}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

LevelFilter.propTypes = {
  selectLevels: PropTypes.func,
  selectedLevels: PropTypes.array
};

LevelFilter.defaultProps = {
  selectLevels: () => {},
  selectedLevels: []
};
