#pragma strict

class Player extends Actor {

  enum Power { None = 0, Air = 1, Fire = 2, Water = 3 };

  /**
   * @var Player's power
   */
  public var power : Power;

  /**
   * Controllador de las animaciones.
   */
  public var animator : Animator;

  /**
   * Fuerza del salto.
   */
  public var jumpForce : float = 9f;

  /**
   * Velocidad con la que el player restablece su posicion.
   */
  public var restoreSpeed : float = 2f;

  /**
   * Numero de salto.
   */
  public var numJump : int = 0;

  /**
   * Posicion a restablecer.
   */
  private var restoreX : float;

  /**
   * Referencias al manejador.
   */
  private var manager : Manager;

  /**
   * Awake
   */
  public function Awake () {
    power = Power.None;
    restoreX = transform.localPosition.x;
    manager = Manager.M();
  }


  public function Update () {
    if (!manager.timer.paused && !manager.stop) {
      if(transform.position.x < restoreX && numJump == 0) {
        rigidbody.velocity.x = restoreSpeed;
      } else {
        rigidbody.velocity.x = 0f;
      }
    }
  }

  /**
   * Activa un poder en el personaje.
   */
  public function ActivatePower (newPower : Power) {
    power = newPower;
  }

  /**
   * Desactiva poderes.
   */
  public function DeactivatePowers () {
    power = Power.None;
  }

  /** 
   * Corre
   */
  public function Run () {
    animator.SetBool("Run", true);
  }

  /** 
   * Muere
   */
  public function Kill () {
    animator.SetBool("Die", true);
  }

  /**
   * Saltar
   */
  public function Jump() {
    animator.SetBool("Jump", true);
    animator.SetBool("Run", false);
    rigidbody.velocity.y = jumpForce;
    ++numJump;
    if (numJump > 1) {
      animator.SetBool("DoubleJump", true);
    }
  }
  
  /**
   * Fin de salto
   */
  public function FinishJump(){
    numJump = 0;
  }
  
  /**
   * Collision
   */
  public function OnCollisionEnter(collision : Collision) {
    if(collision.gameObject.tag == "Obstacle"){
      numJump = 0;
      animator.SetBool("Jump", false);
      animator.SetBool("DoubleJump", false);
      animator.SetBool("Run", true);
    } 
  }
}