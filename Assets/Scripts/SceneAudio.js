#pragma strict
/**
 * Class component, Scene audio determines the audio to be played in a scene.
 */
class SceneAudio extends MonoBehaviour {
  /**
   * @var Name Identifier
   */
  public var audioName : String;
  /**
   * @var Audio clip related.
   */
  public var clip : AudioClip;
  /**
   * @var Flag that indicates if this should loop or not.
   */
  public var split : boolean;
  /**
   * @var If the scene audio was/is split, this indicates the part number of the split.
   */
  public var splitPart : int;
  /**
   * @var Flag that indicates if this should loop or not.
   */
  public var loop : boolean;
  /**
   * @var Identifier.
   */
  @HideInInspector
  public var id : String;

  /**
   * UNITY'S Awake
   * @function
   */
  public function Awake () {
    id = audioName + (split && splitPart > 0 ? splitPart.ToString() : String.Empty);
  }

}