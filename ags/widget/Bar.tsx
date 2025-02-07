import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk4"
import { bind, Variable, GLib } from "astal"

import Tray from "gi://AstalTray"

const time = Variable("").poll(1000, "date")

function SysTray() {
    const tray = Tray.get_default();
    return <box cssName="SysTray">
        {bind(tray, "items").as(items => items.map(item => (
            <menubutton
                tooltipMarkup={bind(item, "tooltipMarkup")}
                menuModel={bind(item, "menuModel")}>
                <image gicon={bind(item, "gicon")} />
            </menubutton>
        )))}
    </box>

}

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    const tray = Tray.get_default();

    function onClick(self: Gtk.Button) {
        console.log(self, time.get(), "Hewwo!!!! :3");
        console.log(
            self,
            tray.get_items().map((item) => {
                return item.get_category();
            })
        );
    }

    return <window
        visible
        cssClasses={["Bar"]}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox cssName="centerbox">
            <button
                onClicked={onClick}
                hexpand
                halign={Gtk.Align.CENTER}
            >
                Welcome to AGS!
            </button>
            < SysTray />
            <menubutton
                hexpand
                halign={Gtk.Align.CENTER}
            >
                <label label={time()} />
                <popover>
                    <Gtk.Calendar />
                </popover>
            </menubutton>
        </centerbox>
    </window>
}
