#pragma strict

/**
 * Fin de obstaculo.
 */
class ObstacleEnd extends MonoBehaviour {
  /**
   * Referencia al manejador.
   */
  @HideInInspector
  public var manager : Manager;

  /**
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
  }

  /**
   * Trigger
   */
  public function OnTriggerEnter (collider : Collider) {
    if (collider.transform.tag == Manager.TagObstacle) {
      if (collider.transform.parent.tag == Manager.TagObstacle) {
        manager.SendToPool(collider.transform.parent.gameObject.GetComponent(Obstacle));
      } else {
        manager.SendToPool(collider.gameObject.GetComponent(Obstacle));
      }
    }
  }

}