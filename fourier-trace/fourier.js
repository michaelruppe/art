function dft(x) {
  // Useful links:
  // https://www.algorithm-archive.org/contents/cooley_tukey/cooley_tukey.html




  const N = x.length;
  let X = [];

  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;

    for (let n = 0; n < N; n++) {
      let phi = TWO_PI * k * n / N; // simplify the brackets to some variable, Phi
      re += x[n] * cos(phi);
      im -= x[n] * sin(phi);

    }
    // average the contributions
    re = re/N;
    im = im/N;

    // collect the output parameters
    let freq = k;
    let amp = sqrt(re*re + im*im);
    let phase = atan2(im, re);

    X[k] = { re, im, freq, amp, phase}; // making an object with 'enhanced object literals ES6'
  }


  return X;
}
