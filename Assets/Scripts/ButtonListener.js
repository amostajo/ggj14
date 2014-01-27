#pragma strict
/**
 * Escucha eventos del boton.
 */
class ButtonListener extends MonoBehaviour {

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
   * Evento de pression de boton.
   *
   * @param boolean isDown
   */
  public function OnPress (isDown : boolean) {
    switch (transform.tag) {
      case Manager.TagFire:
        manager.inputs.OnPressFire(isDown);
        break;
      case Manager.TagAir:
        manager.inputs.OnPressAir(isDown);
        break;
      case Manager.TagWater:
        manager.inputs.OnPressWater(isDown);
        break;
      case Manager.TagJump:
        manager.inputs.OnPressJump(isDown);
        break;
      case Manager.TagBack:
        manager.inputs.OnPressBack(isDown);
        break;
      case Manager.TagContinue:
        manager.inputs.OnPressContinue(isDown);
        break;
      case Manager.TagOptions:
        manager.inputs.OnPressOptions(isDown);
        break;
      case Manager.TagQuit:
        manager.inputs.OnPressQuit(isDown);
        break;
      default:
        break;
    }
  }

}