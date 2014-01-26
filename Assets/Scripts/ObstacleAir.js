#pragma strict

/**
 * Fire obstacle
 */
class ObstacleAir extends ObstacleTrigger {

  /**
   * Inicializa el obstaculo como the aire.
   */
  public function Awake () {
    super.Awake();
    power = Player.Power.Air;
  }

}