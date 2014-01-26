#pragma strict

/**
 * Aniquilador del juego.
 */
public class PlayerKiller extends MonoBehaviour {
  
  /**
   * Relacion al manejador.
   */
  private var manager : Manager;

  /**
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
  }

  /**
   * Fin del juego.
   */
  public function OnTriggerEnter (collider : Collider) {
    if (collider.transform.tag == Manager.TagPlayer) {
      manager.GameOver();
    }
  }

}