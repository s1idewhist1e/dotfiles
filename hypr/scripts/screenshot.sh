#!/bin/sh


help_text () {
cat << EOF
Takes a screenshot
Usage: $0 (-s)
  -s: Do a whole screen screenshot
EOF
}

OPTIND=1

WHOLE_SCREEN=0

while getopts "hs" OPT; do
  case "$OPT" in
    h)
      help_text
      exit 0
      ;;
    s)
      WHOLE_SCREEN=1
      ;;
  esac
done

if [[ "$WHOLE_SCREEN" -eq '0' ]]; then
  slurp | grim -g - - | swappy -f -
else
  grim - | swappy -f -
fi

# grim -t png "$(
#   if [[ "$WHOLE_SCREEN" -ne '0' ]]; then
#     
#     fi )"- | swappy -f -

#grim -g "$(slurp)" - | swappy -f - -o "$(xdg-user-dir)"

