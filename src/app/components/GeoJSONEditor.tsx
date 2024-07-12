import React, { useEffect, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers, keymap } from "@codemirror/view";
import { history } from "@codemirror/commands";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import {
  bracketMatching,
  syntaxHighlighting,
  codeFolding,
} from "@codemirror/language";
import { oneDarkHighlightStyle, oneDark } from "@codemirror/theme-one-dark";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter } from "@codemirror/lint";

export const GeoJSONEditor = ({
  initialValue,
  setCode,
}: {
  initialValue?: string;
  setCode: (code: string) => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const onUpdate = EditorView.updateListener.of((v) => {
      setCode(v.state.doc.toString());
    });
    const state = EditorState.create({
      doc: initialValue,
      extensions: [
        bracketMatching(),
        closeBrackets(),
        history(),
        autocompletion(),
        lineNumbers(),
        oneDark,
        syntaxHighlighting(oneDarkHighlightStyle),
        json(),
        onUpdate,
        linter(jsonParseLinter()),
        keymap.of(vscodeKeymap),
        codeFolding({
          placeholderText: "...",
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: document.querySelector("#editor")!,
    });
    setIsLoaded(true);

    return () => {
      view.destroy();
    };
  }, []);
  return (
    <>
      {!isLoaded && <div className="h-[80vh]">Loading GeoJSON editor...</div>}
      <div id="editor" />
    </>
  );
};
