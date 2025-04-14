#!/bin/env sh

# get screenshot
mkdir -p /tmp/hyprlock
grim /tmp/hyprlock/screen.png

pidof hyprlock || hyprlock
