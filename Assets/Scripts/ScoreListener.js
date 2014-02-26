#pragma strict

/**
 * Listens to game score and displays it on screen.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 */
class ScoreListener extends MonoBehaviour {
  enum Type {GameScore = 0, BonusScore = 1, HighestScore = 2};

  /**
   * Type of score to listen to.
   */
  public var type : Type;

  /**
   * NGUI label
   */
  @HideInInspector
  public var label : UILabel;

  /**
   * Helper, Last displayed score.
   */
  private var lastScore : int;

  /**
   * Helper, score to compare.
   */
  private var score : int;

  /**
   * Manager reference
   */
  private var manager : Manager;

  /**
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
    label = GetComponent(UILabel);
    lastScore = -1;
  }

  /**
   * Start
   * Init score
   */
  public function Start () {
    UpdateScore();
  }

  /**
   * Late Update
   * Updates games score.
   */
  public function LateUpdate () {
    UpdateScore();
  }

  /**
   * Updates score
   */
  private function UpdateScore () {
    switch (type) {
      case Type.HighestScore:
        score = manager.highestScore;
        break;
      case Type.BonusScore:
        score = manager.scoreBonus;
        break;
      default:
        //Gamescore
        score = manager.score;
        break;
    }
    if (lastScore != score) {
      lastScore = score;
      label.text = score.ToString();
    }
  }
}