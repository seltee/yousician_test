// server emulator
import Music from '../../doc/songs.json';

function getData(method, link, data) {
  function answer(info) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(info);
      }, 300 + (Math.random() * 1000));
    });
  }

  function get() {
    switch (link) {
      case '/songs': {
        const {
          start, limit, search, searchLevels
        } = data;

        const searchList = [];
        for (let i = 0; i < Music.length; i++) {
          let allow = true;
          if (search && search.length > 0) {
            const searchString = search.toUpperCase().trim();
            if (!(Music[i].artist.toUpperCase().indexOf(searchString) !== -1
              || Music[i].title.toUpperCase().indexOf(searchString) !== -1)) {
              allow = false;
            }
          }
          if (searchLevels && searchLevels.length && allow) {
            allow = false;
            for (let l = 0; l < searchLevels.length; l++) {
              if (Music[i].level >= searchLevels[l].from && Music[i].level <= searchLevels[l].to) {
                allow = true;
              }
            }
          }
          if (allow) {
            searchList.push(Music[i]);
          }
        }

        const list = [];
        let count = limit;
        for (let i = start; i < searchList.length && count; i++) {
          if (searchList[i]) {
            list.push(searchList[i]);
            count -= 1;
          }
        }

        return answer({
          list,
          count: searchList.length
        });
      }
      default: {
        console.error(`undefined link ${link}`);
        return answer(null);
      }
    }
  }

  switch (method) {
    case 'GET': {
      return get(link, data);
    }
    default: {
      console.error(`undefined method ${method}`);
      return answer(null);
    }
  }
}

export function getList(start, limit, search, searchLevels) {
  return getData('GET', '/songs', {
    start,
    limit,
    search,
    searchLevels
  });
}
