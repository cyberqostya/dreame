class ChoiceBlock {
  constructor(root) {
    this.root = root;
    this.buttonWireless = root.querySelector('.choice__cleaner-button_wireless');
    this.buttonRobot = root.querySelector('.choice__cleaner-button_robot');

    this.state = {
      isWirelessActive: false,
      isRobotActive: false
    };
  }

  changeWirelessState() {
    this.state = {
      isWirelessActive: true,
      isRobotActive: false
    };
  }

  changeRobotState() {
    this.state = {
      isWirelessActive: false,
      isRobotActive: true
    };
  }

  getState() {
    return this.state;
  }
}