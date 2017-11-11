This project is based off a work by Matthew Johnson called "Purlieu Illume (Pharos)" 
I saw it at the Counihan Gallery in Brunswick, VIC.
I knew that I wanted to do something with it, so I took the gallery's brochure back to Newcastle - it featured a half-page print of the work.

I scanned in the image, applied the following blur to remove dithering from the print process, and created this script.


```
src.filter("blur",3); // 3 seems to be optimal balance for speed and efficacy.
src.resize(width,0);
src.save("source-small.png")
```
A blur is neccessary because the inkjet-printed scan had the dithering dots
which were giving erroneous colours when the digital image was sampled.
