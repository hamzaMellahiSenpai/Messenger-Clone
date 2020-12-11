import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { setMsgText } from "../../redux/messages/messages.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectMsgText } from "../../redux/messages/messages.selectors";

function Emojis({setMsgText, msgText, showEmojis}) {
  const addEmoji = (emoji) => {
    setMsgText(msgText + emoji.native);
    console.log(msgText + emoji.native);
  }
  if(!showEmojis) return null;
  return (
    <div>
      <Picker onSelect={addEmoji} title="Pick your emoji…" />
    </div>
  );
}


const mapDispatchToProps = (dispatch) => ({
  setMsgText: (msg) => dispatch(setMsgText(msg))
});

const mapStateToProps = createStructuredSelector({
  msgText: selectMsgText
});

export default connect(mapStateToProps, mapDispatchToProps)(Emojis);
// export default Emojis;