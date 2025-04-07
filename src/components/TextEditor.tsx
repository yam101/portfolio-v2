import { useState } from "react";

export default function TextEditor() {
  const initialContent =
    "welcome to my desktop! \n\nhere, you can: \n✨ click on the desktop icons to see my projects, skills, and more \n✨ open, close, and move windows \n✨ and much more to come...\n\nhave fun exploring!  \n\n- yasmin";

  const [text, setText] = useState(initialContent);

  return (
    <textarea
      className="text-editor"
      value={text}
      onChange={(e) => setText(e.target.value)}
    ></textarea>
  );
}
