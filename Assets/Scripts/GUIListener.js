#pragma strict

/**
 * GUI state listener. To attach to a GUI game object to behave on certain GUI states.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 */
class GUIListener extends MonoBehaviour {

  /**
   * Listening or reaction state.
   */
  public var state : GUIManager.State;

  /**
   * Manager reference
   */
  private var manager : Manager;

  /**
   * Flag that indicates if this is currently hidden.
   */
  private var hidden : boolean = true;

  /**
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
    hidden = true;
  }

  /**
   * Late update
   */
  public function LateUpdate () {
    // Show
    if (manager.GUI.state == state && hidden) {
      hidden = false;
      transform.localPosition.y -= 2000;
    }
    // Hide
    if (manager.GUI.state != state && !hidden) {
      hidden = true;
      transform.localPosition.y += 2000;
    }
  }

}