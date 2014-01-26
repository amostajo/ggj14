#pragma strict

class BossProjectile extends MonoBehaviour {

  public var speed : float;

  private var line : LineRenderer;

  private var shoot : boolean;  

  private var startPosition : Vector3;

  private var target : Transform;

  private var startTime : float;
  /**
   * Referencia al manejador.
   */
  private var manager : Manager;

  /** 
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
    line = GetComponent(LineRenderer);
    startPosition = transform.localPosition;
    gameObject.SetActive(false);
    shoot = false;
  }

  /** 
   * Activa el disparo.
   */
  public function Shoot (newTarget : Transform) {
    gameObject.SetActive(true);
    shoot = true;
    target = newTarget;
    startTime = manager.timer.time;
  }

  public function FixedUpdate () {
    if (shoot) {
      /*
      // Distance moved = time * speed.
      var distCovered = (manager.timer.time - startTime) * speed;
      
      // Fraction of journey completed = current distance divided by total distance.
      var fracJourney = distCovered / journeyLength;
      // Move
      transform.localPosition = Vector3.Lerp(startPosition, target.position, fracJourney);
      // Line
      line.SetPosition(0, transform.localPosition);
      line.SetPosition(1, transform.localPosition + Vector3(0,1,0));
      */
    }
  }


}