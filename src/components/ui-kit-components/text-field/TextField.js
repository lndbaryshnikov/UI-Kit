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

  toggleModifier(modifier, value) {
    const modifierClass = `text-field_${modifier}_${value}`;

    this.textField.classList.toggle(modifierClass);
  }

  setValue(value) {
    this.textField.value = value;
  }

  clearValue() {
    this.textField.value = '';
  }
}

export default TextField;
