import { bind, Variable } from "astal";
import Mpris from "gi://AstalMpris?version=0.1";

const mpris = Mpris.get_default();

export default function Player() {

  const spotify = Mpris.Player.new("spotify");

  const box = <box
    visible={
      bind<boolean>(
        Variable.derive(
          [bind(spotify, "available"), bind(spotify, "title")],
          (available, title) => { return available && title != "" }
        )
      )}
    cssClasses={["player"]} >
    <button onClicked={() => spotify.previous()}>Prev</button>
    <box onButtonPressed={() => spotify.raise()}>{bind(spotify, "title")}</box>
    <image file={bind(spotify, "cover_art")} />
    <button onClicked={() => spotify.next()}>Next</button>
  </box >

  return box;
}
