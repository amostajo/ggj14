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
		var width:float =Screen.width; 
		var height:float =Screen.height; 
		transform.position.x = -1*(width/height*1.6+6.5);
	}
}
