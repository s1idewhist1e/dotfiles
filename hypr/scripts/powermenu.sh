#!/bin/bash

WOFI="wofi --show dmenu"

#SHUTDOWN_COMMAND="shutdown now"
#REBOOT_COMMAND="reboot"
#LOGOUT_COMMAND="loginctl terminate-session self"

case "$($WOFI << END
Shutdown
Log out
Reboot
END
)" in
	"0")
		notify-send "Shutting down..."
		$SHUTDOWN_COMMAND ;;
	"1")
		notify-send "Logging out..."
		$LOGOUT_COMMAND ;;
	"2")
		notify-send "Rebooting.."
		$REBOOT_COMMAND ;;
	*)
		notify-send "Invalid input; doing nothing" ;;
esac

