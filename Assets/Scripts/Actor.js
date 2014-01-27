#pragma strict

/**
 * Actor dentro del juego.
 */
class Actor extends MonoBehaviour {


  /**
   * Controllador de las animaciones.
   */
  public var animator : Animator;
  
  /**
   * Velocidad guardada.
   */
  private var savedVelocity : Vector3;

  /**
   * Velocidad  angular guardada.
   */
  private var savedAngularVelocity : Vector3;

  /**
   * Método a llamarse cuando ocurre una pausa.
   */
  public function OnPause () {
    if (rigidbody) {
      savedVelocity = rigidbody.velocity;
      savedAngularVelocity = rigidbody.angularVelocity;
      rigidbody.isKinematic = true;
    }
  }

  /**
   * Método a llamarse cuando ocurre se resume una pausa.
   */
  public function OnResume () {
    if (rigidbody) {
      rigidbody.isKinematic = false;
      rigidbody.AddForce(savedVelocity, ForceMode.VelocityChange);
      rigidbody.AddTorque(savedAngularVelocity, ForceMode.VelocityChange);
    }
  }

}