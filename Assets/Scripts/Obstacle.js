#pragma strict

/**
 * Game obtacle script. And obstacles is everything related to the game world. 
 * The ground, a hill, water, trees, everything that interacts with the player's actor.
 *
 * @author Alejandro Mostajo <amostajo@gmail.com>
 * @author Adrian Fernandez
 */
class Obstacle extends MonoBehaviour {

  /**
   * Flag that indicates if the obstacle is tail in the queue.
   */
  public var isTail : boolean = false;

  /**
   * Flag that indicates if the obstacles is composed of multiple game objects.
   */
  @HideInInspector
  public var composed : boolean;
  /**
   * X axis fix towards the center of the game object.
   */
  @HideInInspector
  public var xFix : float;
  /**
   * Real size (consider's composed objects)
   */
  @HideInInspector
  public var size : float;

  /**
   * Awake.
   */
  public function Awake () {
    composed = false;
    GetBounds();
  }

  /**
   * Clears ridgidbocy.
   */
  public function Clear () {
    if (rigidbody) {
      rigidbody.isKinematic = false;
      rigidbody.velocity = Vector3.zero;
      rigidbody.isKinematic = true;
    }
  }

  /**
   * Returns the maximum point in the X Axis.
   *
   * @return float max x
   */
  public function GetMaxX () : float {
    return composed 
        ? transform.localPosition.x + xFix
        : renderer.bounds.max.x;
  }

  /**
   * Returns the size in the X Axis.
   *
   * @return float size.
   */
  public function GetSizeX () : float {
    return composed 
        ? size
        : renderer.bounds.size.x;
  }

  /**
   * Assigns initial local position when the object is about to be shown in the scene.
   *
   * @param floar xRef x Reference to the tail.
   */
  public function SetShowPosition (xRef : float) {
    transform.localPosition.x = xRef + (composed
        ? size - xFix
        : renderer.bounds.size.x / 2);
  }

  /**
   * Defines object bounds, and checks if the object is composed.
   */
  private function GetBounds () {
    if (!renderer) {
      var min : Vector3 = Vector3.zero; 
      var max : Vector3 = Vector3.zero;
      var renderes : Renderer[] = GetComponentsInChildren.<Renderer>();
      for (var render : Renderer in renderes) {
        min = min == Vector3.zero 
          ? render.bounds.min 
          : (min.x < render.bounds.min.x ? min : render.bounds.min);

        max = max == Vector3.zero 
          ? render.bounds.max 
          : (max.x > render.bounds.max.x ? max : render.bounds.max);
      }
      xFix = max.x - transform.position.x;
      size = max.x - min.x;
      composed = true;
    }
  }

}