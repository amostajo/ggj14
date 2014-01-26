#pragma strict

/**
 * Escuchador de estados de GUI
 */
class GUIListener extends MonoBehaviour {

  /**
   * Estado al que escucha.
   */
  public var state : GUIManager.State;

  /**
   * Referencia al manejador
   */
  private var manager : Manager;

  /**
   * Bandera que indica si esta oculto.
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
   * Actualización tardía
   */
  public function LateUpdate () {
    // Show
    if (manager.GUI.state == state && hidden) {
      hidden = false;
      transform.localPosition.y -= 2000;
    }

    if (manager.GUI.state != state && !hidden) {
      hidden = true;
      transform.localPosition.y += 2000;
    }
  }

}