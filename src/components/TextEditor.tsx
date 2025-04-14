import { useState } from "react";

export default function TextEditor() {
  const initialContent =
    "welcome to my desktop! \n\nhere, you can: \n✨ click on the desktop icons to learn more about me\n✨ open, close, and move windows \n✨ and more to come soon...\n\nhave fun exploring!  \n\n- yasmin";

  const [text, setText] = useState(initialContent);

  return (
    <textarea
      className="text-editor"
      value={text}
      onChange={(e) => setText(e.target.value)}
    ></textarea>
  );
}
