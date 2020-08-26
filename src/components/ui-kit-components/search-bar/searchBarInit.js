import SearchBar from './SearchBar';

(() => {
  const searchBar = document.querySelectorAll('.js-search-bar');

  searchBar.forEach((item) => { new SearchBar(item); });
})();
