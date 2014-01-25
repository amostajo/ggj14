#pragma strict

class Player extends MonoBehaviour {

  enum Power { None = 0, Air = 1, Fire = 2, Water = 3 };

  /**
   * @var Player's power
   */
  public var power : Power;

  public var jumpForze : float;

  public var numJump : int =0;

  /**
   * Awake
   */
  public function Awake () {
    power = Power.None;
  }


  public function Update(){
    if(transform.position.x <  0 && numJump ==0)
    {
      rigidbody.velocity.x = 2;
    }
    else
    {
        rigidbody.velocity.x = 0;
    }
  }

  public function Jump() {
    rigidbody.velocity.y = 9;
    ++numJump;
  }
  
  public function FinishJump(){
    numJump = 0;
  }
  
  public function OnCollisionEnter(collision : Collision) {
    if(collision.gameObject.tag=="Obstacle"){
    numJump= 0;
  }
  if(collision.gameObject.tag=="PlayerKiller"){
    var pk : PlayerKiller = new PlayerKiller();
    pk.kill();
  }
  
  }
  
  public function getY(){
    return transform.position.y;
  }


}