create folders in root /videos and /output

 trim => ```bun src/index.ts vde  --trim 00:00:00 00:00:10 --filename  Sanam.Teri.Kasam.2016.1080p.Hindi.BluRay.5.1.ESub.x264-HDHub4u.Tv.mkv```

merging => ```bun src/index.ts vde  --merge  Sanam.Teri.Kasam.2016.1080p.Hindi.BluRay.5.1.ESub.x264-HDHub4u.Tv.mkv clip.mkv```

No need to give absolute path of your videos just give the videoname which will be inside of the video folder