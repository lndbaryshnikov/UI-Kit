import TextField from '../text-field/TextField';

class SearchBar {
  constructor(searchBar) {
    this.searchBar = searchBar;

    this._init();
  }

  _init() {
    const { searchBar } = this;

    if (searchBar.dataset.state === 'error') {
      const textField = new TextField(searchBar.querySelector('.js-text-field'));

      const setErrorState = (mode = 'on') => {
        textField.toggleModifier('theme', 'red');

        if (mode === 'on') {
          textField.setValue('I\'ve not found what I\'m looking for...');
        } else {
          textField.clearValue();
        }
      };

      setErrorState();

      textField.onFocus(() => { setErrorState('off'); });
    }
  }
}

export default SearchBar;
