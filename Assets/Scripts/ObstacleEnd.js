#pragma strict

/**
 * Obstacle's end point / trigger.
 * Triggers to deactivae an obstacle.
 *
 * @authro Alejandro Mostajo <amostajo@gmail.com>
 */
class ObstacleEnd extends MonoBehaviour {
  /**
   * Manager reference.
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
   * On Trigger Enter
   * Checks for obstacles to send them to pool.
   *
   * @param Collider collider Collider object.
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