import { Gdk, Gtk } from "astal/gtk4";
import { Box, Button } from "astal/gtk4/widget";

export default function Clock() {
  return <box>{new Date()}</box>;
}
