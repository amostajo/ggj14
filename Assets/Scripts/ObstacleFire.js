#pragma strict

/**
 * Fire obstacle
 */
class ObstacleFire extends ObstacleTrigger {

  /**
   * Inicializa el obstaculo como the fuego.
   */
  public function Awake () {
    super.Awake();
    power = Player.Power.Fire;
  }

}