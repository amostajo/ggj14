#pragma strict

/**
 * GUI manager.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 */
class GUIManager extends MonoBehaviour {

  enum State {Menu = 0, Game = 1, Pause = 2, Controlls = 3, Cinematic = 4, GameOver = 5};

  /**
   * Current state of the GUI.
   */
  public var state : State;

}