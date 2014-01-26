#pragma strict

/**
 * Manejador de entradas.
 */
class InputManager extends MonoBehaviour {

  /**
   * Bandera que indica si la entrada es para restroceder o salir.
   */
  public var back : boolean;

  /**
   * Bandera que indica si la entrada es salto.
   */
  public var jump : boolean;

  /**
   * Bandera que indica si la entrada es salto.
   */
  public var jumpWait : boolean;

  /**
   * Bandera que indica si la entrada es salto.
   */
  public var power : InputPower;

  /**
   * Bandera que indica si se utilizara un joystick o no.
   */
  public var joystick : boolean;

  /**
   * Referencia al manejador.
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
  }

  /**
   * Update
   * Obtiene entradas.
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
   * Procesa todas las entradas para dispositivos desktop o standalone (PCs, Macs, Laptops, Unityweb...)
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
    if (!jumpWait && Input.GetKeyDown(KeyCode.Space)) {
      jump = true;
    } else if (jumpWait || Input.GetKeyUp(KeyCode.Space)) {
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
      if (!jumpWait 
          && (Input.GetKeyDown(KeyCode.Joystick1Button4)
              || Input.GetKeyDown(KeyCode.Joystick1Button0))
      ) {
        jump = true;
      } else if (jumpWait 
          || (Input.GetKeyUp(KeyCode.Joystick1Button4)
              || Input.GetKeyUp(KeyCode.Joystick1Button0))
      ) {
        jump = false;
      }

      // Powers
      // -- Fire
      if (Input.GetKeyDown(KeyCode.Joystick1Button1)) {
        power.fire = true;
      } else if (Input.GetKeyUp(KeyCode.Joystick1Button1)) {
        power.fire = false;
      }

      // -- Water
      if (Input.GetKeyDown(KeyCode.Joystick1Button2)) {
        power.water = true;
      } else if (Input.GetKeyUp(KeyCode.Joystick1Button2)) {
        power.water = false;
      }

      // -- Air
      if (Input.GetKeyDown(KeyCode.Joystick1Button3)) {
        power.air = true;
      } else if (Input.GetKeyUp(KeyCode.Joystick1Button3)) {
        power.air = false;
      }
      power.Check();
    }

  }

  /**
   * Event de acción de botón de poder de fuego.
   *
   * @param boolean isDown Evento de si fue presionado o liberado.
   */
  public function OnPressFire (isDown : boolean) {
    power.fire = isDown;
    power.Check();
  }

  /**
   * Event de acción de botón de poder de agua
   *
   * @param boolean isDown Evento de si fue presionado o liberado.
   */
  public function OnPressWater (isDown : boolean) {
    power.water = isDown;
    power.Check();
  }

  /**
   * Event de acción de botón de poder de aire
   *
   * @param boolean isDown Evento de si fue presionado o liberado.
   */
  public function OnPressAir (isDown : boolean) {
    power.air = isDown;
    power.Check();
  }

  /**
   * Event de acción de botón de atrás
   *
   * @param boolean isDown Evento de si fue presionado o liberado.
   */
  public function OnPressBack (isDown : boolean) {
    back = isDown;
  }

  /**
   * Event de acción de botón de saltar
   *
   * @param boolean isDown Evento de si fue presionado o liberado.
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
   * Limpia entradas.
   */
  public function Clear () {
    back = false;
    jump = false;
    jumpWait = false;
    joystick = false;
    power = new InputPower();
  }

}