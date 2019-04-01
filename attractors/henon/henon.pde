/* 
 * Generate Henon attractors and save
 * it seems like a good formula for an art-size print is:
 *    int numTravellers = 3000;
 *    int numPoints = 20000;
 *    float scale = 2;
 *    
 *    size(3000,3000);
 
 * for something with more sensible rendering times try numTravellers = 500, numPoints = 3000, size(500,500);
 */


final int numTravellers = 1000;
final int numPoints = 3000;
final int numRenders = 1;
final float scale = 2;


Henon[] travellers = new Henon[numTravellers];


final color[] earthTones = {#493829, #816C5B, #A9A18C, #613318, #855723, #B99C6B, #8F3B1B, #D57500, #DBCA69, #404F24, #668D3C, #BDD09F, #4E6172, #83929F, #A3ADB8};
final color[] iceCream   = {#6b3e26, #ffc5d9, #c2f2d0, #fdf5c9, #ffcb85};


void setup() {
  noLoop();
  //randomSeed(271191);
  size(3000, 3000);
  translate(width/2, height/2);
  background(255);
  stroke(255);
  strokeWeight(floor((float)width/500.0)); // increased stroke size for higher images means fewer points to render

  for (int frame = 0; frame < numRenders; frame++) {

    float x0 = 1;
    float a = random(TWO_PI); // use same a value for all
    for (int i=0; i < numTravellers; i++) {

      x0 = (float)i / (float)numTravellers * 2; // smoothly pan the starting point of the travellers
      travellers[i] = new Henon(x0, 0, a);

      // Select a colour from the palette
      //int colIndex = int(random(earthTones.length));
      int colIndex = int(random(iceCream.length));
      stroke(earthTones[colIndex], 50);

      travellers[i].draw(numPoints);
    }

    //String d = nf(day(),2); String m = nf(month(),2); String y = nf(year());
    //String hr = nf(hour(),2); String mn = nf(minute(),2); String s = nf(second(),2);
    //String filename = "/media/michael/ExtraDrive1/art-renders/henon-"+y+m+d+"-"+hr+mn+s+".jpg";
    String filename = "/media/michael/ExtraDrive1/art-renders/henon-a"+a+".jpg";
    saveFrame(filename);
    background(255);
  }
  print("complete");
}
