#pragma strict

/**
 * Offset animation script.
 * To be attached to a plane in order to animate it's texture's offset property.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 */
class OffsetAnimation extends MonoBehaviour {
  static var mainTexture : String = "_MainTex";

  /**
   * Animation speed.
   */
  public var speed : float;

  /**
   * Manager reference.
   */
  private var manager : Manager;

  /**
   * Helper, Starting offset
   */
  private var offset : float = 0f;

  /** 
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
  }

  /**
   * Fixed update
   * Animate.
   */
  public function FixedUpdate () {
    if (!manager.stop) {
      renderer.material.SetTextureOffset(mainTexture, Vector2(
          Mathf.Repeat(manager.timer.time * speed, 1), 
          0
      ));
    }
  }
}