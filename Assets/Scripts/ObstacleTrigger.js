#pragma strict

/**
 * Trigger de obstaculos.
 */
class ObstacleTrigger extends MonoBehaviour {

  /**
   * Score granted by trigger.
   */
  public var score : int = 0;
  /**
   * Poder al cual reacciona el trigger.
   */
  public var power : Player.Power;
  /**
   * Referencia al manejador
   */
  private var manager : Manager;

  /**
   * Awake.
   */
  public function Awake () {
    manager = Manager.M();
  }

  /**
   * Trigger.
   *
   * @var Collider collider
   */
  public function OnTriggerEnter (collider : Collider) {
    if (collider.transform.tag == manager.TagPlayer
        && manager.player.power != power
    ) {
      manager.GameOver(power);
    } else {
      manager.AddScore(score);
    }
  }
}