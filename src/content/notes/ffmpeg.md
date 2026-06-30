To convert video quickly to make it smaller filesize:

```bash
ffmpeg -i week1_sense.mov -c:v hevc_videotoolbox -b:v 20M -vf "scale=-2:1080" -c:a aac -b:a 128k -movflags +faststart week1_sense_comp.mp4
```
