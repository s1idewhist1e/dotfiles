import GObject from "gi://GObject";
import { astalify, type ConstructProps, Gtk, Gdk, Widget } from "astal/gtk4";

export type ToggleButtonProps = ConstructProps<Gtk.ToggleButton, Gtk.ToggleButton.ConstructorProps>
export const ToggleButton = astalify<Gtk.ToggleButton, Gtk.ToggleButton.ConstructorProps>(Gtk.ToggleButton, {
  getChildren(self) { return [self.child] },
  setChildren(self, children) {
    self.set_child(children[0]);
  },
});

