#pragma strict

/**
 * Player's ACTOR killer trigger.
 * Kills player on collision.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 */
public class PlayerKiller extends MonoBehaviour {
  
  /**
   * Manager reference.
   */
  private var manager : Manager;

  /**
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
  }

  /**
   * On trigger enter.
   * Kill player and game over >:D
   *
   * @param Collider collider Collider object
   */
  public function OnTriggerEnter (collider : Collider) {
    if (collider.transform.tag == Manager.TagPlayer) {
      manager.GameOver();
    }
  }

}