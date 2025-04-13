#!/bin/bash

STEP="5%"
SKIP_STEP="5"

if [ $# -lt 1 ]; then
  cat << EOF
Please input a command!
EOF
fi

case $1 in
  "vol-up")
    wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ "$STEP"+
    ;;
  "vol-down")
    wpctl set-volume @DEFAULT_AUDIO_SINK@ "$STEP"-
    ;;
  "mute")
    wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle
    ;;
  "play-pause")
    playerctl play-pause
    ;;
  "next")
    playerctl next
    ;;
  "prev")
    playerctl previous
    ;;
  "skip-forward")
    playerctl position "$SKIP_STEP"+
    ;;
  "skip-backwards")
    playerctl position "$SKIP_STEP"-
    ;;
  *)
    echo "Unrecognized command '$1'!"
    exit -1
    ;;
esac
