#pragma strict
/**
 * GameObject script. Script to be attached to a hidden gameobject in the game scene. 
 * Controls and hangles game time.
 *
 * @author Alejandro Mostajo <amostajo@amsgames.com>
 */

class Timer extends MonoBehaviour {
  /**
   * @var Current game time. (Paused time is subtracted)
   */
  static var time : float;
  /**
   * @var Current game time without pause subtraction.
   */
  static var unpausedTime : float;
  /**
   * @var Time loaded from save file. Helps adjust timer time related variables in game objects.
   */
  static var loadedTime : float;
  /**
   * @var Flag that indicates if the timer is paused.
   */
  @HideInInspector
  public var paused : boolean;
  /**
   * @var Amount of paused time.
   */
  private var pausedTime : float;
  /**
   * @var Time when the timer was paused.
   */
  private var timeWhenPaused : float;
  /**
   * @var Creation time.
   */
  @HideInInspector
  public var creationTime : float;

  /**
   * UNITY START.
   * @function
   */
  function Start () {
    paused = false;
    creationTime = pausedTime = 0.0f;
    if (loadedTime == null) {
      loadedTime = 0f;
    }
  }

  /**
   * UNITY START.
   * @function
   */
  function Update () {
    unpausedTime = Time.time - creationTime;
    if (paused) {
      pausedTime += Time.time - timeWhenPaused;
      timeWhenPaused = Time.time;
    } else {
      time = Time.time - creationTime - pausedTime;
    }
  }

  /**
   * Pauses the timer.
   * @function
   */
  function Pause () {
    paused = true;
    timeWhenPaused = Time.time;
  }

  /**
   * Unpauses the timer.
   * @function
   */
  function Resume () {
    paused = false;
  }

  /**
   * Gets the game time taking in consideration the paused time.
   * @function
   *
   * @return float Game time
   */
  function GetGameTime () : float {
      return time;
  }

}