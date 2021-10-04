class ChoiceBlock {
  constructor(root) {
    this.root = root;
    this.buttonWireless = root.querySelector('.choice__cleaner-button_wireless');
    this.buttonRobot = root.querySelector('.choice__cleaner-button_robot');

    this.stateActivity = {
      wireless: false,
      robot: false
    };
  }

  // Только один блок может быть активным
  // Один активируем, остальные ДЕактивируем
  activeState(stateName) {
    this.stateActivity[stateName] = true;
    Object.keys(this.stateActivity)
      .forEach((item) => { 
        if(item !== stateName) { 
          this.stateActivity[item] = false;
        } 
      });
  }

  getState() { return this.stateActivity }
}