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
   * Gravity when to apply when gliding.
   */
  public var glideForce : float = 18f;

  /**
   * Jump counter.
   */
  @HideInInspector
  public var jumpCount : int = 0;

  /**
   * Flag that indicates if the player actor is gliding or not.
   */
  @HideInInspector
  public var isGliding : boolean = false;

  /**
   * Flag that indicates if the player actor can glide or not.
   */
  @HideInInspector
  public var canGlide : boolean = false;

  /**
   * Flag that indicates if the player actor is under some kind of effect.
   */
  @HideInInspector
  public var isUnderEffect : boolean = false;

  /**
   * Audio clip to be played when the player jumps.
   */
  public var jumpClip : AudioClip;

  /**
   * Audio clip to be played when the player runs.
   */
  public var runningClip : AudioClip;

  /**
   * Speed.
   */
  private var speed : float = 0f;

  /**
   * Original X position, to be restored if an obstacle moves the actore slightly.
   */
  private var originalSpeed : float = 0f;

  /**
   * Original speed, to be restored after down speed effect.
   */
  private var originalX : float;

  /**
   * Awake
   */
  public function Awake () {
    super.Awake();
    power = Power.None;
    originalX = transform.localPosition.x;
    originalSpeed = speed;
    isGliding = false;
    canGlide = false;
  }

  /**
   * Fixed Update
   */
  public function FixedUpdate () {
    if (!manager.timer.paused && !manager.stop) {
      if(!isUnderEffect && transform.localPosition.x < originalX && jumpCount == 0) {
        rigidbody.velocity.x = restoreSpeed;
      } else {
        rigidbody.velocity.x = speed;
      }
    }
    if (isGliding) {
      rigidbody.AddRelativeForce (0, glideForce, 0);
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
  public function Jump () {
    animator.SetBool("Jump", true);
    animator.SetBool("Run", false);
    rigidbody.velocity.y = jumpForce;
    ++jumpCount;
    if (jumpCount > 1) {
      animator.SetBool("DoubleJump", true);
    }
    if (audio && jumpClip) {
      audio.clip = jumpClip;
      audio.loop = false;
      audio.Play();
    }
  }

  /**
   * Glide state. Sets relatedanimations.
   * Performs gliding.
   */
  public function Glide () {
    if (canGlide) {
      if (!isGliding) {
        animator.SetBool("Glide", true);
      }
      isGliding = true;
    }
  }

  /**
   * Turns gliding off and returns to jump state.
   * Unperforms gliding.
   */
  public function Fall () {
    if (isGliding) {
      animator.SetBool("Glide", false);
      animator.SetBool("Jump", true);
      isGliding = false;
    }
  }

  /**
   * Sets actor to a new speed.
   */
  public function SetSpeed (newSpeed : float) {
    speed = newSpeed;
    isUnderEffect = true;
  }

  /**
   * Restores speed to its original value.
   */
  public function RestoreSpeed () {
    speed = originalSpeed;
    isUnderEffect = false;
  }
    
  /**
   * Collision handling
   *
   * @param Collision collision Collision
   */
  public function OnCollisionEnter(collision : Collision) {
    if(collision.gameObject.tag == "Obstacle"){
      jumpCount = 0;
      animator.SetBool("Run", true);
      animator.SetBool("Jump", false);
      animator.SetBool("DoubleJump", false);
      if (isGliding) {
        Fall();
      }
      canGlide = false;
    } 
  }
}