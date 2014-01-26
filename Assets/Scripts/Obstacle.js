#pragma strict

/**
 * Obstaculo
 */
class Obstacle extends MonoBehaviour {

  /**
   * Bounds
   */
  @HideInInspector
  public var bounds : Bounds;

  /**
   * Bandera que indica si es un obstaculo compuesto.
   */
  @HideInInspector
  public var composed : boolean;
  /**
   * Fix de x en relación al centro del objeto.
   */
  @HideInInspector
  public var xFix : float;
  /**
   * Tamaño real
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
   * Limpia el rigidbody
   */
  public function Clear () {
    if (rigidbody) {
      rigidbody.isKinematic = false;
      rigidbody.velocity = Vector3.zero;
      rigidbody.isKinematic = true;
    }
  }

  /**
   * Retorna el punto maximo de X.
   *
   * @return float max x
   */
  public function GetMaxX () : float {
    return composed 
        ? transform.localPosition.x + xFix
        : renderer.bounds.max.x;
  }

  /**
   * Devuelve el tamaño X.
   *
   * @return float tamaño.
   */
  public function GetSizeX () : float {
    return composed 
        ? size
        : renderer.bounds.size.x;
  }

  /**
   * Asigna posicion inicial en show.
   *
   * @param floar xRef referencia x.
   */
  public function SetShowPosition (xRef : float) {
    transform.localPosition.x = xRef + (composed
        ? size - xFix
        : renderer.bounds.size.x / 2);
  }

  /**
   * Definir limites del obstaculos.
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