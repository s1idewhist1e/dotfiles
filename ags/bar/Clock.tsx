import { Gdk, Gtk } from "astal/gtk4";
import { Box, Button } from "astal/gtk4/widget";
import {time} from "../utils"

export default function Clock() {
  return <box cssClasses={["widget"]}>{time((t) => t.format("%H:%M:%S"))}</box>;
}
