import { App } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./bar/Bar"


App.start({
    css: style,
    main() {
        App.get_monitors().map(Bar)
    },
})
