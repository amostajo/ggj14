#pragma strict
import System.Collections.Generic;

enum Scheme {Desktop = 1, Mobile = 2};

/**
 * Manejador del juego, contiene todas las reglas de juego.
 */
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
   * Tag para identificar relación de atras.
   */
  static var TagBack = 'Back';

  /**
   * Tag para identificar relación de salir.
   */
  static var TagQuit = 'Quit';

  /**
   * Tag para identificar relación con player.
   */
  static var TagPlayer = 'PlayerGirl';

  /**
   * Tag para identificar relación con boss.
   */
  static var TagBoss = 'Boss';

  public var particles : List.<GameObject>;

  /**
    * Identifica al jugador
    */
  @HideInInspector
  public var player : Player; 

  /**
    * Identifica al boss, grey gril
    */
  @HideInInspector
  public var boss : Boss; 

  /**
    * Detiene el escenario
    */
  public var stop : boolean;    

  /**
   * Velocidad de los obstaculos.
   */
  public var speed : float;

  /**
   * Intervalo de tiempo para segundo salto.
   */
  public var doubleJumpInterval : float = 0.3f;

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
   * Puntaje
   */
  public var score : int;
  /**
   * Nivel.
   */
  public var level : int;

  /**
   * Esquema con el cual se van a obtener los inputs.
   */
  public var scheme : Scheme;

  public var FireParticles : int =3;
  
  public var WaterParticles : int =2;
  
  public var WindParticles : int =2;

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
   * Referencia al manejador de entradas.
   */
  @HideInInspector
  public var GUI : GUIManager;

  /**
   * Referencia al manejador de entradas.
   */
  @HideInInspector
  public var sceneAudio : AudioManager;

  /**
   * Referencia al timer.
   */
  @HideInInspector
  public var timer : Timer;

  /**
   * Auxiliar, indice.
   */
  private var index : int;

  /**
    * Tiempo para empezar segundo salto
    */  
  private var jumpTime : float = 0.0f; 

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
    GUI = FindObjectOfType(GUIManager);
    sceneAudio = FindObjectOfType(AudioManager);
    timer = FindObjectOfType(Timer);
    player = FindObjectOfType(Player);
    boss = FindObjectOfType(Boss);
    obstacleBegin = GameObject.Find("ObstacleBegin").transform.position;
    // Obtención del schema.
    SetSchema();
    // Pool de obstaculos
    obstacles = List.<Obstacle>();
    show = List.<Obstacle>();
    particles = List.<GameObject>();
    FillPool(poolQuantity);
    // --
    Clear();
    player.gameObject.SetActive(false);
    FillParticles(FireParticles,WaterParticles,WindParticles);
  }

  /**
   * Salto al jugador.
   */
  public function Update () {
    if (inputs.back) {
      HandlePause();
    }
    if (!stop && !timer.paused) {
      // Poder
      if (inputs.power.active) {
        if (inputs.power.fire) {
          player.ActivatePower(Player.Power.Fire);
        } else if (inputs.power.water) {
          player.ActivatePower(Player.Power.Water);
        } else if (inputs.power.air) {
          player.ActivatePower(Player.Power.Air);
        }
      } else {
        player.DeactivatePowers();
      }
      // Salto
      if(inputs.jump) {
        if(player.numJump == 0) {
          player.Jump();
          jumpTime = 0.0f;
        } else if (jumpTime > doubleJumpInterval && player.numJump == 1) {
          player.Jump();
        }
        jumpTime += Time.deltaTime;
      }
    }
  }

  /**
   * Mueve los obstaculos del mundo.
   */
  public function FixedUpdate () {
    if(!stop && !timer.paused) {
      SpawnObstacle();    
      if (show.Count > 0) {
        for (index = show.Count-1;index>=0; --index) {
          if(show[index].gameObject.activeSelf) {
            show[index].transform.Translate(-Time.deltaTime*speed,0,0);
          }
        }
      }
    }
  }

  /**
   * Para el juego.
   */
  public function Stop () {
    stop = true;
  }

  /**
	* Obtiene una particula especifica
	*/
  public function GetParticle(tipo){
  	var resultado : GameObject= null;
  	for(var i=0;i< particles.Count && resultado == null;++i)
  	{
  		if(tipo.ToString() == particles[i].tag.ToString())
  		{
  			resultado = particles[i];
  			particles.Remove(resultado);
  		}
  	}	
  	if(resultado == null)
  	{
  		Debug.Log(tipo.ToString());
  	}
  	return resultado;
  }	

  public function ReturnParticle(particula: GameObject)
  {
  	particles.Add(particula);
  }
  
  /**
   * Agrega puntaje a score.
   */
  public function AddScore (toAdd : int) {
    score += toAdd;
  }
  
  /**
   * Finaliza una partida por culpa de un collider
   */
  public function GameOver (power : Player.Power) {
    Stop();
  }

  /**
   * Finaliza una partida por XY razón.
   */
  public function GameOver () {
    Stop();
  }

  /**
   * Para o resume el juego.
   */
  public function HandlePause () {
    if (timer.paused) {
      timer.Resume();
      player.OnResume();
    } else {
      timer.Pause();
      player.OnPause();
    }
  }


  /***
   * Manda objeto al pool
   *
   * @param Obstacle swimmer.
   */
  public function SendToPool (swimmer : Obstacle) {
    swimmer.gameObject.SetActive(false);
    swimmer.transform.localPosition.x = obstacleBegin.x + swimmer.GetSizeX();
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
    if (show.Count > 0 && obstacleBegin.x - show[show.Count - 1].GetMaxX() 
        >= obstacleWait.GetSizeX()
    ) {
      obstacleWait.SetShowPosition(show[show.Count - 1].GetMaxX());
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
   * Llena el pool de particulas.
   *
   */
  private function FillParticles(fire:int, ice:int, wind:int){
      var prefabs : GameObject[] = Resources.LoadAll.<GameObject>("Particles");
      var particle: GameObject;
  	  for(var i=0;i<fire;++i)
  	  {
		particle = Instantiate (prefabs[0], Vector3.zero, Quaternion.identity); 
		particle.SetActive(false);
		particles.Add(particle);
 	  }
  	  for(i=0;i<ice;++i)
  	  {
  	  	particle = Instantiate (prefabs[1], Vector3.zero, Quaternion.identity);
  	  	particle.SetActive(false);
		particles.Add(particle);
  	  }
  	  for(i=0;i<wind;++i)
  	  {
  	  	particle = Instantiate (prefabs[2], Vector3.zero, Quaternion.identity);
  	  	particle.SetActive(false);
		particles.Add(particle);
  	  }
  	  
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
	//Debug.Log(prefabs.Length);
    while (obstacles.Count < quantity) {
	  obstacle = Instantiate (
          prefabs[Random.Range(0, prefabs.Length)],
          obstacleBegin,
          Quaternion.identity
      ).GetComponent(Obstacle);
      obstacle.gameObject.SetActive(false);
      obstacle.transform.parent = transform;
      obstacles.Add(obstacle);

    }

    obstacle.gameObject.SetActive(true);
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

  private function Clear () {
    score = 0;
  }

}