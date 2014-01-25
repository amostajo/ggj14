#pragma strict

public class PlayerKiller extends MonoBehaviour{
  
  /**
   * Relacion al manejador.
   */
  private var manager : Manager;

  /**
   * Awake
   */
  public function Awake () {
    manager = Manager.M();
  }

  
  public function kill() {
    manager.GameOver();
  }

}