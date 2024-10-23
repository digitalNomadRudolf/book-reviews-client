import React from "react";
import BoldIcon from "@/Icons/editor-buttons/BoldIcon";
import ItalicIcon from "@/Icons/editor-buttons/ItalicIcon";
import StrikeIcon from "@/Icons/editor-buttons/StrikeIcon";
import CodeIcon from "@/Icons/editor-buttons/CodeIcon";
import ParagraphIcon from "@/Icons/editor-buttons/ParagraphIcon";
import H1Icon from "@/Icons/editor-buttons/H1Icon";
import H2Icon from "@/Icons/editor-buttons/H2Icon";
import H3Icon from "@/Icons/editor-buttons/H3Icon";
import H4Icon from "@/Icons/editor-buttons/H4Icon";
import H5Icon from "@/Icons/editor-buttons/H5Icon";
import H6Icon from "@/Icons/editor-buttons/H6Icon";
import UlListIcon from "@/Icons/editor-buttons/UlListIcon";
import OlListIcon from "@/Icons/editor-buttons/OlListIcon";
import BlockquoteIcon from "@/Icons/editor-buttons/BlockquoteIcon";
import UndoIcon from "@/Icons/editor-buttons/UndoIcon";
import RedoIcon from "@/Icons/editor-buttons/RedoIcon";
import LinkIcon from "@/Icons/editor-buttons/LinkIcon";
import { Editor, useCurrentEditor } from "@tiptap/react";

const EditorToolbar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const marks = ["bold", "italic", "link", "strike"];
  const nodes = [
    { type: "heading", options: { level: 1 } },
    { type: "heading", options: { level: 2 } },
    { type: "heading", options: { level: 3 } },
    { type: "heading", options: { level: 4 } },
    { type: "heading", options: { level: 5 } },
    { type: "heading", options: { level: 6 } },
    { type: "codeBlock" },
    { type: "blockquote" },
    { type: "bulletList" },
    { type: "orderedList" },
  ];

  const isAnyActive = (editor: Editor, types: string[], options = {}) => {
    return types.some((type) => editor.isActive(type, options));
  };

  const isAnyMarkActive = isAnyActive(editor, marks);
  const isAnyNodeActive = nodes.some((node) =>
    editor.isActive(node.type, node.options || {})
  );

  const handleLinkToggle = () => {
    if (editor.isActive("link")) {
      // unlink if the link is active
      editor.chain().focus().unsetLink().run();
    } else {
      // prompt user to enter link
      const url = window.prompt("Enter the url: ", "https://");
      if (url) {
        // Apply link to selected text
        editor.chain().focus().setLink({ href: url }).run();
      }
    }
  };

  return (
    <div className="control-group">
      <div className="button-group flex items-center flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${
            editor.isActive("bold")
              ? "text-blue-cream transition border border-blue-cream rounded-sm"
              : "border border-white"
          }`}
        >
          <BoldIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <ItalicIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <StrikeIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <ParagraphIcon />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <H1Icon />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <H2Icon />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <H3Icon />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 })
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <H4Icon />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 })
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <H5Icon />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 })
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <H6Icon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <UlListIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <OlListIcon />
        </button>
        <button
          onClick={handleLinkToggle}
          className={
            editor.isActive("link")
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <LinkIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <CodeIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
        >
          <BlockquoteIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={
            editor.can().undo()
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <UndoIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={
            editor.can().redo()
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <RedoIcon />
        </button>
        <button
          className={
            isAnyMarkActive
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Clear marks
        </button>
        <button
          className={
            isAnyNodeActive
              ? "text-blue-cream transition border border-blue-cream px-1 rounded-sm"
              : "border border-white px-1"
          }
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear nodes
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;
