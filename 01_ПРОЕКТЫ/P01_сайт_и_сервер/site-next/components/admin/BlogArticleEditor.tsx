"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { JSONContent } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import type { ContentBlock } from "@/lib/content/article-blocks";
import { contentBlocksToTiptapDoc, tiptapDocToContentBlocks } from "@/lib/content/tiptap-serialize";

type BlogArticleEditorProps = {
  initialBlocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  uploadImage: (file: File) => Promise<string | null>;
};

const DEBOUNCE_MS = 280;

export default function BlogArticleEditor({
  initialBlocks,
  onChange,
  uploadImage,
}: BlogArticleEditorProps) {
  const [uploadBusy, setUploadBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [seed] = useState(() => initialBlocks);
  const initialDoc = useMemo(() => contentBlocksToTiptapDoc(seed), [seed]);

  const scheduleChange = useCallback(
    (doc: JSONContent) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange(tiptapDocToContentBlocks(doc));
      }, DEBOUNCE_MS);
    },
    [onChange]
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Image.configure({
        HTMLAttributes: { class: "blog-editor__image" },
      }),
      Placeholder.configure({ placeholder: "Начните писать статью…" }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: initialDoc,
    editorProps: {
      attributes: { class: "blog-editor__content" },
    },
    onUpdate: ({ editor: current }) => scheduleChange(current.getJSON()),
  });

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    []
  );

  const runImageUpload = async (file: File) => {
    if (!editor) return;
    setUploadBusy(true);
    try {
      const url = await uploadImage(file);
      if (url) editor.chain().focus().setImage({ src: url }).run();
    } finally {
      setUploadBusy(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="blog-editor">
      <div className="blog-editor__toolbar">
        <button
          type="button"
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          type="button"
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
        <button
          type="button"
          className={editor.isActive("bold") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          type="button"
          className={editor.isActive("italic") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          type="button"
          className={editor.isActive("bulletList") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          •
        </button>
        <button
          type="button"
          className={editor.isActive("orderedList") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1.
        </button>
        <button
          type="button"
          className={editor.isActive("blockquote") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          “
        </button>
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploadBusy}>
          {uploadBusy ? "Загрузка…" : "Фото"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void runImageUpload(file);
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
