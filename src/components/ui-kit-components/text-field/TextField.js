class TextField {
  constructor(textField) {
    this.textField = textField;
  }

  onFocus(listener) {
    this.textField.addEventListener('focus', listener);
  }

  onBlur(listener) {
    this.textField.addEventListener('blur', listener);
  }
}

export default TextField;
