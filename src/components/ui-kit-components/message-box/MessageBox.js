class MessageBox {
  constructor($messageBox, consultantName) {
    this.$messageBox = $messageBox;
    this.consultantName = consultantName;

    this._init();
  }

  _init() {
    this._defineElements();
    this._setData();
  }

  _defineElements() {
    this.$consultantNamePlace = this.$messageBox.find('.js-message-box__name');
    this.$messageBox = this.$messageBox.find('.js-message-box__message');

    this.standardMessage = 'Hey! Can I help you?';
  }

  _setData() {
    this.$consultantNamePlace.text(this.consultantName);
    this.$messageBox.text(this.standardMessage);
  }
}

export default MessageBox;
