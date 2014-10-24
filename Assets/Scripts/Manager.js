#pragma strict
import System.Collections.Generic;

enum Scheme {Desktop = 1, Mobile = 2};

/**
 * Game Manager.
 * Handles game rules and interactions. This is the orchetrator that indicates everything that happends in the game.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 * @author Adrian Fernandez
 */
class Manager extends MonoBehaviour {

  /**
   * Obstacles tag identifier.
   */
  static var TagObstacle = 'Obstacle';

  /**
   * Fire tag identifier.
   */
  static var TagFire = 'Fire';

  /**
   * Air tag identifier.
   */
  static var TagAir = 'Air';

  /**
   * Water tag identifier.
   */
  static var TagWater = 'Water';

  /**
   * Jump tag identifier.
   */
  static var TagJump = 'Jump';

  /**
   * Back tag identifier.
   */
  static var TagBack = 'Back';

  /**
   * Quit tag identifier.
   */
  static var TagQuit = 'Quit';

  /**
   * Player's actor tag identifier.
   */
  static var TagPlayer = 'PlayerGirl';

  /**
   * Boss tag identifier.
   */
  static var TagBoss = 'Boss';

  /**
   * Continue tag identifier.
   */
  static var TagContinue = 'Continue';

  /**
   * Options tag identifier.
   */
  static var TagOptions = 'Options';

  /**
   * Player ACTOR reference. THE GIRL
   */
  @HideInInspector
  public var player : Player; 

  /**
   * Boss ACTOR reference. THE GRAY GIRL
   */
  @HideInInspector
  public var boss : Boss; 

  /**
   * Stop flag that when set on true can stop the current moving level. Stops all obstacles.
   */
  public var stop : boolean;    

  /**
   * Obstacles movement speed.
   */
  public var speed : float;

  /**
   * Double jump interval. The duration needed (in seconds) to enable double jump.
   */
  public var doubleJumpInterval : float = 0.22f;

  /**
   * Glide interval. The duration needed (in seconds) to enable glide after double jump.
   */
  public var glideInterval : float = 0.3f;

  /**
   * Obstacles POOL.
   */
  public var obstacles : List.<Obstacle>;
  
  /**
   * Active obstacles.
   */
  public var show : List.<Obstacle>;

  /**
   * Property that ONLY afects when the game awakes. Instantiate the number of obstacles set in the variable.
   */
  public var poolQuantity : int;

  /**
   * Score.
   */
  @HideInInspector
  public var score : int = 0;

  /**
   * Score bonus.
   */
  @HideInInspector
  public var scoreBonus : int = 0;

  /**
   * Highest score.
   */
  @HideInInspector
  public var highscore : int = 0;

  /**
   * Current level.
   */
  public var level : int;

   /*
    * Acceleration level
    */
  public var acceleration : float = 40.0;

  /*
   * Max speed level
   */
  public var maxSpeed : float = 21;
 

  /**
   * Current input scheme.
   */
  public var scheme : Scheme;

  /**
   * Obstacles spawn location.
   */
  @HideInInspector
  public var obstacleBegin : Vector3;

  /**
   * Input manager reference.
   */
  @HideInInspector
  public var inputs : InputManager;

  /**
   * GUI manager referebce.
   */
  @HideInInspector
  public var GUI : GUIManager;

  /**
   * Scene's audio manager reference.
   */
  @HideInInspector
  public var sceneAudio : AudioManager;

  /**
   * Timer reference.
   */
  @HideInInspector
  public var timer : Timer;

  /**
   * Helper, index for loops.
   */
  private var index : int;

  /**
   * Jump time counter. Counts the time lapsed since the jump started, help determine when to enable double jump.
   */  
  private var jumpTime : float = 0.0f; 

  /**
   * Helper, obstacle.
   */
  private var obstacle : Obstacle;

  /**
   * Helper, On Hold obstacle. Holded until the game determines it can be the tail of the active list of obstacles.
   */
  private var obstacleOnHold : Obstacle;

  
  /**
   * Returns MANAGER game object for reference.
   *
   * @return Manager
   */
  static function M () : Manager {
    return FindObjectOfType(Manager);
  }

  /**
   * Unity Awake.
   * Init properties and checks for references.
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
    if (show == null) {
      show = List.<Obstacle>();
    }
    FillPool(poolQuantity);
    // --
    Clear();
    Stop();
    GUI.state = GUIManager.State.Menu;
    highscore = PlayerPrefs.GetInt("highscore");
  }

  /**
   * Start
   */
  public function Start () {
    sceneAudio.Play("menu");
  }

  /**
   * Update
   * Game logic and rules checker.
   */
  public function Update () {
    StateCheck();
    if (!stop && !timer.paused) {
        // Powers
        if(speed<maxSpeed){
            speed += Time.deltaTime/acceleration;
        }
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
      // Jump
      if(inputs.jump) {
        if (player.jumpCount == 0) {
          player.Jump();
          jumpTime = 0.0f;
        } else if (player.jumpCount == 1 && jumpTime > doubleJumpInterval) {
          player.Jump();
          jumpTime = 0.0f;
        } else if (player.jumpCount == 2 && jumpTime > glideInterval) {
          player.canGlide = true;
          player.Glide();
        } else if (player.jumpCount == 2) {
          player.Glide();
        }
        jumpTime += Time.deltaTime;
      } else {
        if (player.isGliding) {
          player.Fall();
        }
      }
    }
  }

  /**
   * Late Update
   * Updates score for display
   */
  public function LateUpdate () {
    // Update score
    if (!stop && !timer.paused) {
      score = scoreBonus + Mathf.FloorToInt(timer.time);
    }
  }

  /**
   * Checks the current state of the GUI to determine what to display or which method to call.
   */
  private function StateCheck () {
    switch (GUI.state) {
      case GUIManager.State.Menu:
        player.Idle();
        if (inputs.next) {
          GUI.state = GUIManager.State.Game;
          Resume();
          Clear();
          sceneAudio.Play("game");
        }
        if (inputs.options) {
          GUI.state = GUIManager.State.Controlls;
        }
        break;
      case GUIManager.State.Controlls:
        if (inputs.back) {
          GUI.state = GUIManager.State.Menu;
        }
        break;
      case GUIManager.State.Game:
        player.Run();
        if (inputs.back) {
          GUI.state = GUIManager.State.Pause;
          HandlePause();
        }
        break;
      case GUIManager.State.Pause:
        if (inputs.next) {
          GUI.state = GUIManager.State.Game;
          HandlePause();
        } else if (inputs.quit) {
          Application.Quit();
        }
        break;
      case GUIManager.State.GameOver:
        if (inputs.next) {
          Application.LoadLevel("transition");
        } else if (inputs.quit) {
          Application.Quit();
        }
        break;
      default:
        break;
    }
  }

  /**
   * Fixed updated.
   * Moves obstacles in the game.
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
   * Stops the game.
   */
  public function Stop () {
    stop = true;
  }

  /**
   * Resumes stopped game.
   */
  public function Resume () {
    stop = false;
  }
  
  /**
   * Adds points to score.
   *
   * @param int points Score points to add
   */
  public function AddScore (points : int) {
    scoreBonus += points;
  }
  
  /**
   * Ends the game, caused by a power.
   *
   * @param Player.Power power Cause power
   */
  public function GameOver (power : Player.Power) {
    OnGameOver();
  }

  /**
   * Game Over, no specific reason.
   */
  public function GameOver () {
    OnGameOver();
  }

  /**
   * Handles game pause. Pauses and unpauses game, depending its state.
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
   * Sends obstacle object to pool.
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
   * Called when game is over.
   */
  private function OnGameOver () {
    player.Kill();
    Stop();
    GUI.state = GUIManager.State.GameOver;
    // Update best score
    if (score > highscore) {
      PlayerPrefs.SetInt("highscore", score);
    }
  }

  /**
   * Spawns new obstacle.
   */
  private function SpawnObstacle() {
    while(obstacleOnHold==null){
      obstacleOnHold = GetObstacle();
      obstacles.Remove(obstacleOnHold);
    }
    if (show.Count > 0 && obstacleBegin.x - show[show.Count - 1].GetMaxX() 
        >= obstacleOnHold.GetSizeX()
    ) {
      obstacleOnHold.SetShowPosition(show[show.Count - 1].GetMaxX());
      obstacleOnHold.gameObject.SetActive(true);
      show.Add(obstacleOnHold);
      obstacleOnHold = null;
    }
  }

  /**
   * Returns an available obstacle for usage. Used by manager to spawn an obstacle.
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
   * Fills pool on scenes awake.
   *
   * @param int quantity Fill quantity.
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
  }

  /**
   * Checks the current plataform running and sets the scheme.
   * In the editor, the scheme set in the inspector will have the priority.
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

  /**
   * Clears manager.
   */
  private function Clear () {
    score = 0;
    scoreBonus = 0;
    timer.creationTime = timer.time;
  }

}