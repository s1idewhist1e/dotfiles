
import { bind } from "astal"
import { Gdk, Gtk, hook } from "astal/gtk4";

import Tray from "gi://AstalTray"

const tray = Tray.get_default();

function TrayItem({ item }: { item: Tray.TrayItem }) {
  const button = (<menubutton
    tooltipMarkup={bind(item, "tooltipMarkup")}
    menuModel={bind(item, "menuModel")}

    // This becomes null if a monitor is disconnected
    name={bind(item, "title").as((title) => title ?? "")}

    setup={
      (self: Gtk.Widget) => hook(self, item, "notify::action-group", () => {
        self.insert_action_group("dbusmenu", item.get_action_group());
      })}>

    <image gicon={bind(item, "gicon")} />
  </menubutton>) as Gtk.MenuButton

  const cont = new Gtk.EventControllerLegacy();

  cont.set_propagation_phase(Gtk.PropagationPhase.CAPTURE);

  cont.connect("event", (_: Gtk.EventController, ev: Gdk.Event) => {

    if (ev.get_event_type() === Gdk.EventType.BUTTON_PRESS) {

      if ((ev as Gdk.ButtonEvent).get_button() === Gdk.BUTTON_SECONDARY) {
        item.about_to_show();
      }

    } else if (ev.get_event_type() === Gdk.EventType.BUTTON_RELEASE) {

      const state = ev as Gdk.ButtonEvent;

      const mouse_button = state.get_button();
      const [_, x, y] = state.get_position();

      if (state.get_surface() !== button.get_native()?.get_surface()) {
        // It was released on a popup (this happens for some reason)
        return;
      }

      switch (mouse_button) {
        case Gdk.BUTTON_PRIMARY:
          item.activate(x, y);
          break
        case Gdk.BUTTON_MIDDLE:
          item.secondary_activate(x, y);
          break
        case Gdk.BUTTON_SECONDARY:
          button.popup();
          break;
      }
    } else {
      return false;
    }
    return true;

  });

  button.add_controller(cont);

  return button;
}

export default function SysTray() {
  return (
    <box>
      {bind(tray, "items").as((items) => {
        return items
          .sort((a, b) => a.title?.localeCompare(b.title))
          .map((item) => <TrayItem item={item} />)
      })}
    </box>
  )
}


