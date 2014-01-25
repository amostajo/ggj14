#pragma strict

class ObstacleEnd extends MonoBehaviour {
  @HideInInspector
  public var manager : Manager;

  public function Awake () {
    manager = Manager.M();
  }

  public function OnTriggerEnter (collider : Collider) {
    if (collider.transform.tag == Manager.TagObstacle) {
      manager.SendToPool(collider.gameObject.GetComponent(Obstacle));
    }
  }

}