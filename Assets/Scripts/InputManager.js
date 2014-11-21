#pragma strict

/**
 * Input manager. Handles all inputs in the game.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 */
class InputManager extends MonoBehaviour {

  /**
   * Flag that indicates a back action. I.e. Back Button.
   */
  public var back : boolean;

  /**
   * Flag that indicates a quit action. I.e. Quit Button.
   */
  public var quit : boolean;

  /**
   * Flag that indicates a next action. I.e. Next Button or Continue Button.
   */
  public var next : boolean;

  /**
   * Flag that indicates options action. I.e. Tutorial Button or other.
   */
  public var options : boolean;

  /**
   * Flag that indicates jump action. 
   */
  public var jump : boolean;

  /**
   * Flag that indicates if a jump input must wait until to be turned on or not.
   */
  public var jumpWait : boolean;

  /**
   * Power input.
   */
  public var power : InputPower;

  /**
   * Flag that indicates if a joystick is on.
   */
  public var joystick : boolean;
  /**
   * Flag that indicates if a joystick is on.
   */
  public var axis : boolean;
	
  /**
   * Game manager reference.
   */
  @HideInInspector
  public var manager : Manager;

  /**
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
    Clear();
    // Joystick check
    if (manager.scheme == Scheme.Desktop) {
      for (var joyName in Input.GetJoystickNames()) {
        joystick = true;
        break;
      }
    }
    axis = false;
  }

  /**
   * Update
   */
  public function Update () {
    switch (manager.scheme) {
      case Scheme.Desktop:
        ProcessDesktop();
        break;
      default:
        break;
    }
  }

  /**
   * Process all stand alone inputs (PCs, Macs, Laptops, Unityweb...)
   */
  private function ProcessDesktop () {
    // Entradas por teclado.
    // Back
    if (Input.GetKeyDown(KeyCode.Escape)) {
      back = true;
    } else if (back && Input.GetKeyUp(KeyCode.Escape)) {
      back = false;
    }

    // Jump
    if (!jumpWait && Input.GetKeyDown(KeyCode.Space) ) {
      jump = true;
    } else if (jumpWait || Input.GetKeyUp(KeyCode.Space) ) {
      jump = false;
    }

    // Powers
    // -- Fire
    if (Input.GetKeyDown(KeyCode.A)) {
      power.fire = true;
    } else if (Input.GetKeyUp(KeyCode.A)) {
      power.fire = false;
    }

    // -- Water
    if (Input.GetKeyDown(KeyCode.S)) {
      power.water = true;
    } else if (Input.GetKeyUp(KeyCode.S)) {
      power.water = false;
    }

    // -- Air
    if (Input.GetKeyDown(KeyCode.D)) {
      power.air = true;
    } else if (Input.GetKeyUp(KeyCode.D)) {
      power.air = false;
    }
    power.Check();

	// -- Joystick
    if (joystick) {

      // Back
      if (Input.GetKeyDown(KeyCode.Joystick1Button5)) {
        back = true;
      } else if (back && Input.GetKeyUp(KeyCode.Joystick1Button5)) {
        back = false;
      }

      // Jump
      if (!jumpWait && Input.GetKeyDown("joystick button 2"))
      {
        jump = true;
        axis = true;
      } else if (jumpWait || (Input.GetKeyUp("joystick button 2") && axis))
       {
        jump = false;
        axis = false;
      }

      // Powers
      // -- Fire
      if (Input.GetKeyDown("joystick button 0")) {
        power.fire = true;
      } else if (Input.GetKeyUp("joystick button 0")) {
        power.fire = false;
      }

      // -- Water
      if (Input.GetKeyDown("joystick button 1")) {
        power.water = true;
      } else if (Input.GetKeyUp("joystick button 1")) {
        power.water = false;
      }

      // -- Air
      if ( Input.GetKeyDown("joystick button 3")) {
        power.air = true;
      } else if (Input.GetKeyUp("joystick button 3")) {
        power.air = false;
      }
      power.Check();
    }

  }

  /**
   * Event triggered the the fire power button is pressed.
   *
   * @param boolean isDown Buttons is pressed or unpressed.
   */
  public function OnPressFire (isDown : boolean) {
    power.fire = isDown;
    power.Check();
  }

  /**
   * Event triggered the water power button is pressed.
   *
   * @param boolean isDown Buttons is pressed or unpressed.
   */
  public function OnPressWater (isDown : boolean) {
    power.water = isDown;
    power.Check();
  }

  /**
   * Event triggered the air power button is pressed.
   *
   * @param boolean isDown Buttons is pressed or unpressed.
   */
  public function OnPressAir (isDown : boolean) {
    power.air = isDown;
    power.Check();
  }

  /**
   * Event triggered the back button is pressed.
   *
   * @param boolean isDown Buttons is pressed or unpressed.
   */
  public function OnPressBack (isDown : boolean) {
    back = isDown;
  }

  /**
   * Event triggered the next button is pressed.
   *
   * @param boolean isDown Buttons is pressed or unpressed.
   */
  public function OnPressContinue (isDown : boolean) {
    next = isDown;
  }

  /**
   * Event triggered the the options button is pressed.
   *
   * @param boolean isDown Buttons is pressed or unpressed.
   */
  public function OnPressOptions (isDown : boolean) {
    options = isDown;
  }

  /**
   * Event triggered the quit button is pressed.
   *
   * @param boolean isDown Buttons is pressed or unpressed.
   */
  public function OnPressQuit (isDown : boolean) {
    quit = isDown;
  }

  /**
   * Event triggered the jump button is pressed.
   *
   * @param boolean isDown Buttons is pressed or unpressed.
   */
  public function OnPressJump (isDown : boolean) {
    // Jump
    if (!jumpWait && isDown) {
      jump = true;
    } else if (jumpWait || !isDown) {
      jump = false;
    }
  }

  /**
   * Clears all inputs.
   */
  public function Clear () {
    back = false;
    jump = false;
    jumpWait = false;
    joystick = false;
    next = false;
    options = false;
    power = new InputPower();
  }

}