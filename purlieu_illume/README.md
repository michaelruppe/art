The source image was initially taken from a hi-res scan, then blurred and
resized to source-small.png as follows.

```
src.filter("blur",3); // 3 seems to be optimal balance for speed and efficacy.
src.resize(width,0);
src.save("source-small.png")
```
A blur is neccessary because the inkjet-printed scan had the dithering dots
which were giving erroneous colours
