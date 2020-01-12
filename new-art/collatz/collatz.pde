// attempting to visualise the Collatz Conjecture
// inspiration:
// https://youtu.be/EYLWxwo1Ed8


void setup () {
  noLoop();
  size(1200, 600);
  background(0);
  float len = 5;
  float ang = 0.2;

  // start at bottom
  for (int i = 1; i < 10000; i++) {
    //int i = 50;
    IntList sequence = new IntList();
    int n = i;
    do {
      sequence.append(n);
      n = collatz(n);
    } while (n != 1) ;
    sequence.append(1);
    sequence.reverse();

    resetMatrix();
    translate(width/2, height/2);
    for (int j = 0; j < sequence.size(); j++) {
      int value = sequence.get(j);
      
      if (value % 2 == 0) {
        rotate(-ang);
      } else {
        rotate(ang);
      }
      stroke(255, 50);
      line(0, 0, len, 0);
      translate(len, 0);

    }
    // Visualise the list
  }
  println("finished");
}


int collatz(int n) {
  // even
  if (n % 2 == 0) {
    return n / 2;

    // odd
  } else {
    return (3*n + 1)/2;
  }
}
