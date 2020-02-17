class MessageBox {
  constructor($messageBox, consultantName) {
    this._$messageBox = $messageBox;
    this._consultantName = consultantName;

    this._init();
  }

  _init() {
    this._defineElements();
    this._setData();
  }

  _defineElements() {
    this._$consultantNamePlace = this._$messageBox.find('.js-message-box__name');
    this._$messageBox = this._$messageBox.find('.js-message-box__message');

    this._standardMessage = 'Hey! Can I help you?';
  }

  _setData() {
    this._$consultantNamePlace.text(this._consultantName);
    this._$messageBox.text(this._standardMessage);
  }
}

export default MessageBox;
