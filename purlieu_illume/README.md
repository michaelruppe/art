This project is based off a work by Matthew Johnson called "Purlieu Illume (Pharos)" 
I saw it at the Counihan Gallery in Brunswick, VIC.
I knew that I wanted to do something with it, so I took the gallery's brochure back to Newcastle - it featured a half-page print of the work.

I scanned in the print and used it as the seed for this small project. The original work is used as the initial conditions, and a noise function alters the colours of the dots.


It was necessary to preprocess the scan with a blur the inkjet-printed brochure had dithering-dots which were giving erroneous colours when the raw scan was sampled.

```
src.filter("blur",3); // 3 seems to be optimal balance for speed and efficacy.
src.resize(width,0);
src.save("source-small.png")
```
