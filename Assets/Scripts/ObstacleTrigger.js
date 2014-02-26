#pragma strict

/**
 * Obstacle trigger.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 * @author Adrian Fernandez
 */
class ObstacleTrigger extends MonoBehaviour {
  /**
   * Score granted by trigger.
   */
  public var score : int = 0;
  /**
   * Trigger power
   */
  public var power : Player.Power;
  /**
   * Manager reference
   */
  private var manager : Manager;

  /**
   * Awake.
   */
  public function Awake () {
    manager = Manager.M();    
  }

  /**
   * On trigger enter.
   * Checks for special colliders that might trigger an special event.
   *
   * @param Collider collider Collider
   */
  public function OnTriggerEnter (collider : Collider) {
    if (collider.transform.tag == manager.TagPlayer
        && manager.player.power != power
    ) {
      manager.GameOver(power);
    } else if (collider.transform.tag == manager.TagPlayer) {
      manager.AddScore(score);
    } else if (collider.transform.tag == manager.TagBoss) {
      manager.boss.Attack(power);
    }
  }
}