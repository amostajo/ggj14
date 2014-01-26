﻿#pragma strict

class Player extends Actor {

  enum Power { None = 0, Air = 1, Fire = 2, Water = 3 };

  /**
   * @var Player's power
   */
  public var power : Power;

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
   * Saltar
   */
  public function Jump() {
    rigidbody.velocity.y = jumpForce;
    ++numJump;
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
    } 
  }
}