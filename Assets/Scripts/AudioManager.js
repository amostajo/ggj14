#pragma strict
/**
 * Class, singletone audio manager.
 * @class
 *
 * @author Alejandro Mostajo <amostajo@amsgames.com>
 */
class AudioManager extends MonoBehaviour {
  /**
   * @var Instansce of the audio manager.
   */
  private static var instance : AudioManager;
  /**
   * @var List of sound effects.
   */
  private var sfx : List.<AudioSource>;
  /**
   * @var List of background musing
   */
  private var bgm : List.<AudioSource>;
  /**
   * @var Dictionary of all scene audios in the game.
   */
  private var audios : Dictionary.<String, SceneAudio>;
  /**
   * @var Current audio in play.
   */
  @HideInInspector
  public var inPlayAudio : String;
  /**
   * @var Split part in play
   */
  @HideInInspector
  public var splitPart : int = 0;
  /**
   * @var Flag that indicates if the audio is split.
   */
  private var split : boolean = false;
  /**
   * @var Builder that helps to build audio scene names.
   */
  private var nameBuilder : System.Text.StringBuilder;

  /**
   * UNITY'S Awake
   * @function
   */
  public function Awake () {
    audios = Dictionary.<String, SceneAudio>();
    var sceneAudios : Component[] = GetComponents(SceneAudio);
    for (var sceneAudio : Component in sceneAudios) {
      var real = sceneAudio as SceneAudio;
      audios.Add(real.audioName, real);
    }
    inPlayAudio = String.Empty;
    nameBuilder = new System.Text.StringBuilder();
    if (instance != null && instance != this) {
      Destroy(gameObject);
      return;
    } else {
      instance = this;
    }
    DontDestroyOnLoad(gameObject);
  }

  public function Update () {
    if (split && audio && !audio.isPlaying) {
      PlayNextPart();
    }
  }

  /**
   * Returns current audio manager instance.
   * @function
   *
   * @return AudioManager
   */
  public static function GetInstance() : AudioManager {
     return instance;
  }

  /**
   * Resets scene audios.
   * @function
   */
  public function Reset () {
    if (audios != null) {
      audios.Clear();
    }
    var clips : SceneAudio[] = FindObjectsOfType(SceneAudio) as SceneAudio[];
    for (var index : int = 0; index < clips.length; index++) {
      audios.Add(clips[index].id, clips[index]);
    }
  }

  /**
   * Plays a scene audio.
   * @function
   *
   * @param String audioName Name of the audio to play.
   */
  public function Play (audioName : String) {
    if (audio && audios.ContainsKey(audioName)) {
      if (audio.isPlaying) {
        audio.Stop();
      }
      inPlayAudio = audioName;
      audio.clip = audios[audioName].clip;
      audio.loop = audios[audioName].loop;
      split = audios[audioName].split;
      splitPart = audios[audioName].splitPart;
      audio.Play();
    }
  }

  /**
   * Stops an audio playing.
   * @function
   */
  public function Stop () {
    if (audio) {
      audio.Stop();
    }
  }

  private function PlayNextPart () {
    nameBuilder.Length = 0;
    nameBuilder.Capacity = 16;
    nameBuilder.Append(audios[inPlayAudio].audioName).Append(audios[inPlayAudio].splitPart + 1);
    if (audios.ContainsKey(nameBuilder.ToString())) {
      Play(nameBuilder.ToString());
    }
  }
}