#pragma strict

/**
 * Jefe, THE GREY GIRL
 */
class Boss extends MonoBehaviour {

  public var projectiles : List.<BossProjectile>;

  /**
   * Ataca al player con un poder determinado.
   *
   * @param Player.Power power Poder de ataque.
   */
  public function Attack (power : Player.Power, target : Transform) {
    projectiles[power - 1].Shoot(target);
  }

}