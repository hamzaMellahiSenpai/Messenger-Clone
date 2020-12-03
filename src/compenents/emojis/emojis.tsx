import react from "react";
import { Emoji, Picker } from "emoji-mart";
import { styles } from "./emojis.styles";

export default function Emjois() {
  const showEmojis = (e) => {
    this.setState({ showEmojis: true }, () =>
      document.addEventListener("click", this.closeMenu)
    );
  };
  const closeMenu = (e) => {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState(
        {
          showEmojis: false
        },
        () => document.removeEventListener("click", this.closeMenu)
      );
    }
  };
  if (!showEmojis)
    return (
      <p style={styles.getEmojiButton} onClick={this.showEmojis}>
        {String.fromCodePoint(0x1f60a)}
      </p>
    );
  return (
    <span style={styles.emojiPicker} ref={(el) => (this.emojiPicker = el)}>
      <Picker onSelect={this.addEmoji} emojiTooltip={true} title="weChat" />
    </span>
  );
}
