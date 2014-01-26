#pragma strict

/**
 * Trigger de obstaculos.
 */
class ObstacleTrigger extends MonoBehaviour {

  private var particle : GameObject;
  
  public var particlePosition : Transform;
  /**
   * Score granted by trigger.
   */
  public var score : int = 0;
  /**
   * Poder al cual reacciona el trigger.
   */
  public var power : Player.Power;
  /**
   * Referencia al manejador
   */
  private var manager : Manager;

  /**
   * Awake.
   */
  public function Awake () {
    manager = Manager.M();
    var allChildren = gameObject.GetComponentsInChildren(Transform);
    for (var child : Transform in allChildren) {
    	if(child.name == "Particles")
    	{
    		particlePosition = child.transform;
    	}
    }
    
  }

  /**
   * Trigger.
   *
   * @var Collider collider
   */
  public function OnTriggerEnter (collider : Collider) {
    if (collider.transform.tag == manager.TagPlayer
        && manager.player.power != power
    ) {
      manager.GameOver(power);
    } else if (collider.transform.tag == manager.TagPlayer) {
      manager.AddScore(score);
    } else if (collider.transform.tag == manager.TagBoss) {
      manager.boss.Attack(power);
      particle = manager.GetParticle(power);
      particle.transform.parent =particlePosition;
      particle.gameObject.SetActive(true);
    }
  }
  
  public function OnDisable(){
  	if(particle)
  	{
  		particle.gameObject.SetActive(false);
  		manager.ReturnParticle(particle);
  	}
  }
}