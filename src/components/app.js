import React from 'react';
import { getList } from 'src/api/datapoint';
import 'scss/app.scss';

import LevelFilter from './level-filter';
import ListElement from './list-element';

const limitPerPage = 5;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      selectedLevels: [],
      page: 0,
      count: null,
      list: [],
      inLoad: false
    };
  }

  componentDidMount() {
    this.loadPage(true);
  }

  loadPage(clear) {
    const {
      search, selectedLevels, page, list
    } = this.state;

    this.setState({
      inLoad: true
    });

    getList(
      clear ? 0 : page * limitPerPage,
      limitPerPage,
      search,
      selectedLevels
    ).then((response) => {
      this.setState({
        inLoad: false
      });

      if (clear) {
        this.setState({
          list: response.list,
          count: response.count,
          page: 1
        });
      } else {
        const newList = list.concat(response.list);
        this.setState({
          list: newList,
          count: response.count,
          page: page + 1
        });
      }
    });
  }

  handleSearch = (newVal) => {
    setTimeout(() => {
      if (this.state.search === newVal) {
        this.loadPage(true);
      }
    }, 300);

    this.setState({
      search: newVal
    });
  };

  handleSearchInput = (event) => {
    this.handleSearch(event.target.value);
  };

  selectLevels = (newLevels) => {
    this.setState({
      selectedLevels: newLevels
    }, () => this.loadPage(true));
  };

  loadMore = () => {
    this.loadPage(false);
  };

  render() {
    const {
      search, list, count, inLoad, selectedLevels
    } = this.state;

    return (
      <div className="app-component">
        <div className="header">
          <div className="block-middle">
            <div>
              Yousician Demo
            </div>
          </div>
        </div>
        <div className="search">
          <div className="block-middle">
            <div>
              <input
                placeholder="Search"
                value={search}
                onChange={this.handleSearchInput}
              />
              <div
                className={`close${search ? '' : ' disabled'}`}
                role="button"
                tabIndex={0}
                onClick={() => this.handleSearch('')}
                onKeyPress={() => this.handleSearch('')}
              />
            </div>
            <div>
              <LevelFilter
                selectedLevels={selectedLevels}
                selectLevels={this.selectLevels}
              />
            </div>
          </div>
        </div>
        <div className="list">
          {
            inLoad ? <div className="loader" /> : null
          }
          <div className="block-middle">
            {
              count === 0 ? <h3>No results</h3> : null
            }
            {
              list.map((o) => (<ListElement
                key={o.title}
                newSearch={this.handleSearch}
                {...o}
              />))
            }
          </div>
        </div>
        <div className="pagination">
          <div className="block-middle">
            <div
              className={`load-more${count === list.length ? ' disabled' : ''}`}
              onClick={this.loadMore}
              onKeyPress={this.loadMore}
              tabIndex={0}
              role="button"
            >
              Load more
            </div>
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }
}
