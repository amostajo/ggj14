#pragma strict

/**
 * The user's actor(also called as the player's character in gaming terms). 
 * References to the actor controlled by the user.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 * @author Adrian Fernandez
 */
class Player extends Actor {

  enum Power { None = 0, Air = 1, Fire = 2, Water = 3 };

  /**
   * Player's power
   */
  public var power : Power;

  /**
   * Jump force.
   */
  public var jumpForce : float = 9f;

  /**
   * Speed with which the character restores his original position, if an obstacle moves him slightly.
   */
  public var restoreSpeed : float = 2f;

  /**
   * Jump counter.
   */
  public var jumpCount : int = 0;

  /**
   * Original X position, to be restored if an obstacle moves the actore slightly.
   */
  private var restoreX : float;

  /**
   * Awake
   */
  public function Awake () {
    super.Awake();
    power = Power.None;
    restoreX = transform.localPosition.x;
  }

  /**
   * Update
   */
  public function Update () {
    if (!manager.timer.paused && !manager.stop) {
      if(transform.position.x < restoreX && jumpCount == 0) {
        rigidbody.velocity.x = restoreSpeed;
      } else {
        rigidbody.velocity.x = 0f;
      }
    }
  }

  /**
   * Activates player's power.
   *
   * @param Power newPower Power to activate.
   */
  public function ActivatePower (newPower : Power) {
    power = newPower;
  }

  /**
   * Deactivates current power.
   */
  public function DeactivatePowers () {
    power = Power.None;
  }

  /** 
   * Idle state. Set related animations
   */
  public function Idle () {
    animator.SetBool("Idle", true);
    animator.SetBool("Run", false);
  }

  /** 
   * Revive state. Set related animations
   */
  public function Revive () {
    animator.SetBool("Die", false);
    animator.SetBool("Revive", true);
  }


  /** 
   * Running state. Set related animations
   */
  public function Run () {
    animator.SetBool("Run", true);
    animator.SetBool("Revive", false);
  }

  /** 
   * Killed state. Set related animations
   */
  public function Kill () {
    animator.SetBool("Die", true);
  }

  /**
   * Jump state. Set related animations
   * Performs jump.
   */
  public function Jump() {
    animator.SetBool("Jump", true);
    animator.SetBool("Run", false);
    rigidbody.velocity.y = jumpForce;
    ++jumpCount;
    if (jumpCount > 1) {
      animator.SetBool("DoubleJump", true);
    }
  }
    
  /**
   * Collision handling
   *
   * @param Collision collision Collision
   */
  public function OnCollisionEnter(collision : Collision) {
    if(collision.gameObject.tag == "Obstacle"){
      jumpCount = 0;
      animator.SetBool("Jump", false);
      animator.SetBool("DoubleJump", false);
      animator.SetBool("Run", true);
    } 
  }
}