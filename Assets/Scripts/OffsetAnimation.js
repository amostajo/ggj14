#pragma strict

/**
 * Animacion offset.
 */
class OffsetAnimation extends MonoBehaviour {

  /**
   * Velocidad de animacion.
   */
  public var speed : float;
  /**
   * Referencia al manejador.
   */
  private var manager : Manager;

  /** 
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
  }
  /**
   * Offset
   */
  private var offset : float = 0f;

  /**
   * Anima el offset.
   */
  public function FixedUpdate () {
    if (!manager.stop) {
      renderer.material.SetTextureOffset("_MainTex", Vector2(
          Mathf.Repeat(manager.timer.time * speed, 1), 
          0
      ));
    }
  }
}