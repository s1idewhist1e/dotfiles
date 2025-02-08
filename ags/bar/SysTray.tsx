
import { bind } from "astal"
import { Gdk, Gtk } from "astal/gtk4";

import Tray from "gi://AstalTray"

const tray = Tray.get_default();

function TrayItem({ item }: { item: Tray.TrayItem }) {
  const button = (<menubutton
    tooltipMarkup={bind(item, "tooltipMarkup")}
    menuModel={bind(item, "menuModel")}
    //popover={false}

    setup={
      (self: Gtk.Widget) => self.insert_action_group("dbusmenu", item.actionGroup)
    }>gtk4

    <image gicon={bind(item, "gicon")} />
  </menubutton>) as Gtk.MenuButton

  const controller = new Gtk.EventControllerKey();

  controller.set_propagation_phase(Gtk.PropagationPhase.CAPTURE);

  controller.connect("key-pressed", (widget: Gtk.Widget, key) => {
    console.log(widget, key, "Key pressed")
    if (key === Gdk.BUTTON_SECONDARY) {
      item.about_to_show();
    }
  });

  controller.connect("key-released", (_c: Gtk.EventController, ev: Gdk.ButtonEvent) => {
    console.log(_c, ev, "Key released");
    const buttonType = ev.get_button();

    const [_, x, y] = ev.get_position();

    if (buttonType === Gdk.BUTTON_PRIMARY) {
      item.activate(x, y);
    } else if (buttonType === Gdk.BUTTON_MIDDLE) {
      item.secondary_activate(x, y);
    } else {
      button.popup();
    }
  });

  button.add_controller(controller);

  return button;
}

export default function SysTray() {
  return (
    <box>
      {bind(tray, "items").as((items) => {
        return items
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((item) => <TrayItem item={item} />)
      })}
    </box>
  )
}


