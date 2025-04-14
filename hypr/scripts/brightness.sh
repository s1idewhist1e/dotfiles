#!/bin/bash

STEP="5%"

if [ $# -lt 1 ]; then
  cat << EOF
Please input a command!
EOF
fi

case $1 in
  "up")
    brightnessctl s +"$STEP"
    ;;
  "down")
    IFS="," read -ra BRIGHTNESS_OUT <<< "$(brightnessctl -pm s "$STEP"-)"
    if [ ${BRIGHTNESS_OUT[2]} -eq 0 ]; then
      brightnessctl s 1
    else
      brightnessctl s "$STEP"-
    fi
    ;;
  *)
    echo "Unrecognized command '$1'!"
    exit -1
    ;;
esac
