#pragma strict
import System.Collections.Generic;

enum Scheme {Desktop = 1, Mobile = 2};

class Manager extends MonoBehaviour {

  /**
   * Tag para identificar obstaculos.
   */
  static var TagObstacle = 'Obstacle';

  /**
   * Tag para identificar relación a poder de fuego.
   */
  static var TagFire = 'Fire';

  /**
   * Tag para identificar relación a poder de aire.
   */
  static var TagAir = 'Air';

  /**
   * Tag para identificar relación a poder de aire.
   */
  static var TagWater = 'Water';

  /**
   * Tag para identificar relación de salto.
   */
  static var TagJump = 'Jump';

  /**
    * Identifica al jugador
    */
  @HideInInspector
  public var player : Player; 

  /**
    * Detiene el escenario
    */
  public var stop : boolean;    

  /**
    * Tiempo para empezar segundo salto
    */  
  public var jumpTime : float = 0.0f; 

  /**
   * Velocidad de los obstaculos.
   */
  public var speed : float;

  /**
   * Obstaculos inactivos POOL.
   */
  public var obstacles : List.<Obstacle>;
  
  /**
   * Obstaculos activos y en movimiento.
   */
  public var show : List.<Obstacle>;

  /**
   * Cantidad de obstaculos a crear en pool.
   */
  public var poolQuantity : int;

  /**
   * Nivel.
   */
  public var level : int;

  /**
   * Esquema con el cual se van a obtener los inputs.
   */
  public var scheme : Scheme;

  /**
   * Punto de arranque para obstaculos.
   */
  @HideInInspector
  public var obstacleBegin : Vector3;

  /**
   * Referencia al manejador de entradas.
   */
  @HideInInspector
  public var inputs : InputManager;

  /**
   * Auxiliar, indice.
   */
  private var index : int;

  /**
   * Auxiliar, obstaculo.
   */
  private var obstacle : Obstacle;

  /**
   * Obstaculo en espera de ser movido.
   */
  private var obstacleWait : Obstacle;

  /**
   * Devuelve el manager a quien lo necesite.
   */
  static function M () : Manager {
    return FindObjectOfType(Manager);
  }

  /**
   * Unity Awake.
   */
  public function Awake () {
    // Propiedades
    inputs = FindObjectOfType(InputManager);
    player = FindObjectOfType(Player);
    obstacleBegin = GameObject.Find("ObstacleBegin").transform.position;
    // Obtención del schema.
    SetSchema();
    // Pool de obstaculos
    obstacles = List.<Obstacle>();
    show = List.<Obstacle>();
    FillPool(poolQuantity);
  }

  /**
   * Salto al jugador.
   */
  public function Update(){
    if(inputs.jump)     {
      if(player.numJump == 0)
      {
        player.Jump();
        jumpTime = 0.0f;
      }
      else
      {
        if(jumpTime>0.3 && player.numJump==1)
        {
          player.Jump();
        }
      }
    }
    jumpTime += Time.deltaTime;
  }

  /**
   * Mueve los obstaculos del mundo.
   */
  public function FixedUpdate () {
    if(!stop) {
      SpawnObstacle();    
      for (index = show.Count-1;index>=0; --index) {
        if(show[index].gameObject.activeSelf)
          show[index].transform.Translate(-Time.deltaTime*speed,0,0);
      }
    }
  }

  /**
   * Para el juego.
   */
  public function Stop ()   {
    stop = true;
  }
  
  /**
   * Finaliza una partida
   */
  public function GameOver () {
    // TODO
  }


  /***
   * Manda objeto al pool
   *
   * @param Obstacle swimmer.
   */
  public function SendToPool (swimmer : Obstacle) {
    swimmer.gameObject.SetActive(false);
    swimmer.transform.localPosition.x = obstacleBegin.x + swimmer.gameObject.renderer.bounds.size.x;
    show.Remove(swimmer);
    obstacles.Add(swimmer);
  }

  /**
   * Crea obstaculos.
   */
  private function SpawnObstacle() {
    while(obstacleWait==null){
      obstacleWait = GetObstacle();
      obstacles.Remove(obstacleWait);
    }
    if (obstacleBegin.x -show[show.Count - 1].gameObject.renderer.bounds.max.x 
        >= obstacleWait.gameObject.renderer.bounds.size.x
    ) {
      obstacleWait.transform.localPosition.x = 
        obstacleWait.gameObject.renderer.bounds.extents.x + show[show.Count - 1].gameObject.renderer.bounds.max.x;
      obstacleWait.gameObject.SetActive(true);
      show.Add(obstacleWait);
      obstacleWait = null;
    }
  }

  /**
   * Busca un obstaculos inactivo del Pool para activarlo como nuevo.
   *
   * @return Obstacle
   */
  private function GetObstacle () : Obstacle {
    for (index = Random.Range(0, obstacles.Count); index < obstacles.Count; ++index) {
      if (!obstacles[index].gameObject.activeSelf) {
        return obstacles[index];
      }
    }
    return;
  }
  
  /**
   * Llena la piscina Pool para el arranque del juego.
   *
   * @param int quantity Cantidad de objetos en pool.
   */
  private function FillPool (quantity : int) {

    var builder : System.Text.StringBuilder = new System.Text.StringBuilder();

    builder.Append("Level").Append(level).Append("/Obstacles");

    var prefabs : GameObject[] = Resources.LoadAll.<GameObject>(builder.ToString());

    while (obstacles.Count < quantity) {

      obstacle = Instantiate (
          prefabs[Random.Range(0, prefabs.Length)],
          Vector3.zero,
          Quaternion.identity
      ).GetComponent(Obstacle);
      obstacle.gameObject.SetActive(false);
      obstacle.transform.parent = transform;
      obstacles.Add(obstacle);

    }
    show.Add(obstacle);
    obstacles.Remove(obstacle);
  }

  /**
   * Identifica el esquema basado en el tipo de plataforma en ejecución.
   * En editor, se utiliza la indicada por el developer.
   */
  private function SetSchema () {
    switch (Application.platform) {
      case RuntimePlatform.Android:
      case RuntimePlatform.IPhonePlayer:
        scheme = Scheme.Mobile;
        break;
      case RuntimePlatform.OSXEditor:
      case RuntimePlatform.WindowsEditor:
        break;
      default:
        scheme = Scheme.Desktop;
        break;
    }
  }

}