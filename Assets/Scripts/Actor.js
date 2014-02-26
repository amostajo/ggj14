#pragma strict

/**
 * Actor inside the game
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 * @author Adrian Fernandez
 */
class Actor extends MonoBehaviour {

  /**
   * Manager reference.
   */
  @HideInInspector
  public var manager : Manager;

  /**
   * Animator controller.
   */
  public var animator : Animator;
  
  /**
   * Saved velocity. For game pause purposes.
   */
  private var savedVelocity : Vector3;

  /**
   * Saved angular velocity. For game pause purposes.
   */
  private var savedAngularVelocity : Vector3;

  /**
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
  }

  /**
   * Called when the game is paused.
   */
  public function OnPause () {
    if (rigidbody) {
      savedVelocity = rigidbody.velocity;
      savedAngularVelocity = rigidbody.angularVelocity;
      rigidbody.isKinematic = true;
    }
  }

  /**
   * Called when the game is resumed from pause.
   */
  public function OnResume () {
    if (rigidbody) {
      rigidbody.isKinematic = false;
      rigidbody.AddForce(savedVelocity, ForceMode.VelocityChange);
      rigidbody.AddTorque(savedAngularVelocity, ForceMode.VelocityChange);
    }
  }

}