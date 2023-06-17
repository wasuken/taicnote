import { useRef } from "react";

const CopyToClipboardButton: React.FC<{ text: string }> = ({ text }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopyClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      // クリップボードへのコピーが成功した場合の処理
      // 例: アラートメッセージの表示
      alert("Copied to clipboard!");
    }
  };

  return (
    <>
      <textarea
        ref={textareaRef}
        value={text}
        style={{ position: "fixed", top: "-9999px" }}
        readOnly
      />
      <button onClick={handleCopyClick}>Copy to Clipboard</button>
    </>
  );
};

export default CopyToClipboardButton;
