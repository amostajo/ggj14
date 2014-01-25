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
   * Constructor.
   */
  public function InputPower () {
    Clear();
  }

  /**
   * Limpia entradas.
   */
  public function Clear () {
    fire = false;
    air = false;
    water = false; 
  }

}