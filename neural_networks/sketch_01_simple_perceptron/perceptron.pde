int sign(float n){
  if (n >=0) {
    return 1;
  } else {
    return -1;
  }
}


class Perceptron {
  float[] weights = new float[3];
  float learningRate = 0.1;

  // Constructor
  Perceptron(int n){
    weights = new float[n];
  // Initialise random weights
    for (int i=0; i < weights.length; i++){
      weights[i] = random(-1,1);
    }
  }

  int guess(float[] inputs) {
    float sum = 0;
    for (int i=0; i < weights.length; i++) {
      sum += inputs[i]*weights[i];
    }
    int output = sign(sum);
    return output;
  }
  
  void train(float[] inputs, int target) {
    int guess = guess(inputs);
    int error = target - guess;
    // Tune the weights
    for (int i=0; i<weights.length; i++) {
      weights[i] += error * inputs[i] * learningRate;
    }
  }
  
  float guessY(float x) { //w0*x + w1*y + w2*b = 0 --> y= ... return
    float w0 = weights[0];
    float w1 = weights[1];
    float w2 = weights[2];
    
    return -(w2/w1) - (w0/w1) * x;
  }
  
}