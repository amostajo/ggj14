#pragma strict
/**
 * 
 * Puts a killer on the left of the screen 
 *
 * @author Adrian Fernandez <fadrian59@gmail.com>
 */
public class PlayerKillerPosition extends MonoBehaviour { 
	/**
   	 * Start
   	 * Puts a killer on the left of the screen 
   	 */
	function Start () {
		transform.position.x = -1.0f*(parseFloat(Screen.width)/parseFloat(Screen.height)*1.6f+6.5f);
	}
}