#pragma strict

/**
 * Power inputs
 */
class InputPower {

  /**
   * Fire power input flag.
   */
  public var fire : boolean;

  /**
   * Air power input flag.
   */
  public var air : boolean;

  /**
   * Water power input flag.
   */
  public var water : boolean;

  /**
   * Flag that indicates when any power is active.
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
   * Clears flags.
   */
  public function Clear () {
    fire = false;
    air = false;
    water = false;
    active = false;
  }

}