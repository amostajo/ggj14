#pragma strict

/**
 * Obstacle trigger.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 * @author Adrian Fernandez
 */
class ObstacleTrigger extends MonoBehaviour {

  enum Effect {None = 0, SpeedChange = 1};

  /**
   * Score granted by trigger.
   */
  public var score : int = 0;

  /**
   * Trigger power
   */
  public var power : Player.Power;

  /**
   * Player speed changed/set by the trigger.
   */
  public var playerSpeed : float = 0f;

  /**
   * Manager reference
   */
  private var manager : Manager;

  /**
   * Effect in execution when entered trigger.
   */
  private var effect : Effect;

  /**
   * Awake.
   */
  public function Awake () {
    manager = Manager.M();    
    effect = Effect.None;
  }

  /**
   * On trigger enter.
   * Checks for special colliders that might trigger an special event.
   *
   * @param Collider collider Collider
   */
  public function OnTriggerEnter (collider : Collider) {
    if (collider.transform.tag == manager.TagPlayer 
        && power != Player.Power.None
        && manager.player.power != power
    ) {
      manager.GameOver(power);
    } else if (collider.transform.tag == manager.TagPlayer) {
      manager.AddScore(score);
      if (playerSpeed != 0f) {
        effect = Effect.SpeedChange;
        manager.player.SetSpeed(playerSpeed);
      }
    } else if (collider.transform.tag == manager.TagBoss) {
      manager.boss.Attack(power);
    }
  }

  /**
   * On trigger exit.
   * Restores any effect done when entered.
   *
   * @param Collider collider Collider
   */
  public function OnTriggerExit (collider : Collider) {
    switch (effect) {
      case Effect.SpeedChange:
        manager.player.RestoreSpeed();
        break;
      default:
        break;
    }
  }
}