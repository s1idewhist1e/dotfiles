import { App, Astal, Gdk } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./bar/Bar"
import { Gio } from "astal";

function initWindows(monitor: Gdk.Monitor): Astal.Window[] {
    return [Bar(monitor)] as Astal.Window[];
}

App.start({
    css: style,
    main() {

        const windows = new Map<Gdk.Monitor, Astal.Window[]>

        for (const monitor of App.get_monitors()) {
            windows.set(monitor, initWindows(monitor));
        }

        // Most of this comes from here: https://github.com/Mabi19/desktop-shell/blob/b9bccd151d63a54614325228ec1b4dbf4f345c08/app.ts
        // Thanks Mabi19
        const display = Gdk.Display.get_default();
        const monitors = display?.get_monitors() as Gio.ListModel<Gdk.Monitor>;

        monitors?.connect("items-changed",
            (list: Gio.ListModel<Gdk.Monitor>,
                _pos: number,
                _rem: number,
                _add: number) => {

                console.warn("Monitors have been added/removed!");

                const oldMonitors = new Set<Gdk.Monitor>(windows.keys());
                const newMonitors = new Set<Gdk.Monitor>();

                let monitor: Gdk.Monitor | null;
                for (let i = 0; (monitor = list.get_item(i)); i++) {
                    newMonitors.add(monitor);
                }

                const removed = oldMonitors.difference(newMonitors);
                const added = newMonitors.difference(oldMonitors);

                for (const monitor of removed) {
                    windows.get(monitor)?.forEach((mon) => mon.destroy());
                }

                display?.sync();

                for (const monitor of added) {
                    windows.set(monitor, initWindows(monitor));
                }

                console.log("Monitors removed: ", Array.from(removed).map((m) => m.description));
                console.log("Monitors added: ", Array.from(added).map((m) => m.description));
            });

    },
})
