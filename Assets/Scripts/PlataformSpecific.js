#pragma strict

/**
 * Destroys the game object if the plataform doesn't matches the selected scheme in the script.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 */
class PlataformSpecific extends MonoBehaviour {

  /**
   * Scheme specific.
   */
  public var schemes : List.<Scheme>;

  /**
   * Manager referebce.
   */
  private var manager : Manager;

  /**
   * Awake
   */
  public function Awake () {
    if (schemes == null) {
      schemes = List.<Scheme>();
    }
    manager = Manager.M();
    DestroyOnScheme();
  }

  /**
   * Destroys object on different scheme than selected.
   */
  private function DestroyOnScheme () {
    var save : boolean = false;
    for (var index = schemes.Count - 1; index >= 0; --index) {
      if (schemes[index] == manager.scheme) {
        save = true;
        break;
      }
    }
    if (!save) {
      Destroy(gameObject);
    }
  }

}