import { useEditor } from "@tiptap/react";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";

export const useCustomEditor = () => {
  const extensions = [
    TextStyle.configure({
      types: [TextStyle.name, ListItem.name],
    } as any),
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
    Link.configure({
      openOnClick: false,
    }),
  ];

  const editor = useEditor({
    extensions,
  });

  return {
    editor,
    extensions,
  };
};
