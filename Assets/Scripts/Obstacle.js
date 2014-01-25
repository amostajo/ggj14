#pragma strict

class Obstacle extends MonoBehaviour {

  public function Clear () {
    rigidbody.isKinematic = false;
    rigidbody.velocity = Vector3.zero;
    rigidbody.isKinematic = true;
  }

}