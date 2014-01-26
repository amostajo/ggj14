#pragma strict

/**
 * GUI
 */
class GUIManager extends MonoBehaviour {

  enum State {Menu = 0, Game = 1, Pause = 2, Controlls = 3};

  /**
   * Estado del GUI.
   */
  public var state : State;

}