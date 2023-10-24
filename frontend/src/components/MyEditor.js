import React, { useState, useCallback } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = useCallback((command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }, [editorState]);

  return (
    <Editor
      editorState={editorState}
      handleKeyCommand={handleKeyCommand}
      onChange={setEditorState}
    />
  );
}

export default MyEditor;
