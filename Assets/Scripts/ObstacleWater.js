#pragma strict

/**
 * Fire obstacle
 */
class ObstacleWater extends ObstacleTrigger {

  /**
   * Inicializa el obstaculo como the agua.
   */
  public function Awake () {
    super.Awake();
    power = Player.Power.Water;
  }

}