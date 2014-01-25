#pragma strict

/**
 * Indentifica objetos propios por plataforma.
 */
class PlataformSpecific extends MonoBehaviour {

  /**
   * Schemas specificos para este script.
   */
  public var schemes : List.<Scheme>;

  /**
   * Relacion al manejador.
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
   * Elimina el objecto si no se corre en una plataforma específica.
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