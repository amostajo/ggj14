#pragma strict
/**
 * Input manager. Handles all inputs in the game.
 *
 * @author Adrian Fernandez
 */
class TimeBehavior extends MonoBehaviour {

  /**
   * Start.
   */
  public function Start () {
      
    var time: System.DateTime = System.DateTime.Now;
    if(time.Hour<14 && time.Hour>6) {
        light.color = Color.white;
    }
    if(time.Hour<18 && time.Hour>14) {
        light.color = new Color(0.9254f,0.6f,0.1921f);
    }
    if(time.Hour<24 && time.Hour>18) {
        light.color = new Color(0.236f,0.153f,0.49f);
    }
    if(time.Hour<6 && time.Hour>0) {
        light.color = new Color(0.553f,0.815f,1.00f);
    }

  }

}