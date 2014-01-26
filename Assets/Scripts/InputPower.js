#pragma strict

/**
 * Tipo de input
 */
class InputPower {

  /**
   * Entrada poder de fuego.
   */
  public var fire : boolean;

  /**
   * Entrada poder aire.
   */
  public var air : boolean;

  /**
   * Entrada poder agua.
   */
  public var water : boolean;

  /**
   * Entrada poder agua.
   */
  public var active : boolean;

  /**
   * Constructor.
   */
  public function InputPower () {
    Clear();
  }

  /**
   * Checks if any power is active
   */
  public function Check () {
    active = fire || air || water;
  }

  /**
   * Limpia entradas.
   */
  public function Clear () {
    fire = false;
    air = false;
    water = false;
    active = false;
  }

}