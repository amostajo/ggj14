#pragma strict

function Start () {
    
    var time: System.DateTime = System.DateTime.Now;
    if(time.Hour<14 && time.Hour>6)
    {
        light.color = Color.white;
    }
    if(time.Hour<18 && time.Hour>14)
    {
        light.color = new Color(0.9254,0.6,0.1921);
    }
    if(time.Hour<24 && time.Hour>18)
    {
        light.color = new Color(0.236,0.153,0.49);
    }
    if(time.Hour<6 && time.Hour>0)
    {
        light.color = new Color(0.236,0.153,0.49);
    }


}

