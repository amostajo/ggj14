#pragma strict
/**
 * 
 * Puts a killer on the left of the screen 
 *
 * @author Adrian Fernandez <fadrian59@gmail.com>
 */
public class PlayerKillerPosition extends MonoBehaviour { 

	/**
   	 * The extra factor to fix the object position with the relation width-height of the screen
     */
	public var ratio : float = 1.6f;
	
	/**
   	 * The constant that move the object to a standard position
     */
	public var adjustment : float = 6.5f;

	/**
   	 * Start
   	 * Puts a killer on the left of the screen 
   	 */
	function Start () {
		transform.position.x = -1.0f*(parseFloat(Screen.width)/parseFloat(Screen.height)*ratio+adjustment);
	}
}