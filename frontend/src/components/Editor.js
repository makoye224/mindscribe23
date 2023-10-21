import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../context/context';
import Quill from 'quill';

// Import the Quill image-resize module
import 'quill/dist/quill.core.css'; // Optional, import Quill's core CSS
import 'quill/dist/quill.bubble.css'; // Optional, import Quill's bubble theme CSS
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';
import 'react-quill/dist/quill.snow.css';

// Import the Quill image resize module
import 'quill-resize-module';

const Editor = () => {
  const { title } = useParams();
  const { journals, setJournals } = useStateContext();

  // Find the selected journal entry based on the title
  const selectedJournalEntry = journals.find((entry) => entry.title === title);

  // Initialize the text with the content of the selected entry, if found
  const initialText = selectedJournalEntry ? selectedJournalEntry.contents : '';

  const [journalName, setJournalName] = useState(title);
  const [text, setText] = useState(initialText);

  // Use useEffect to automatically save changes to the journals state
  useEffect(() => {
    const updatedJournals = journals.map((entry) => {
      if (entry.title === title) {
        // Update the content and name of the selected entry
        return { ...entry, contents: text, title: journalName };
      }
      return entry;
    });
    setJournals(updatedJournals);
  }, [title, journalName, text, journals, setJournals]);

  const handleJournalNameChange = (event) => {
    setJournalName(event.target.value);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ align: [] }],  
      ['clean'],
      ['undo', 'redo'],
    ],
  };

  return (
    <Container className="editor-container">
      <br />
      <input
        type="text"
        value={journalName}
        onChange={handleJournalNameChange}
        style={{ border: 'none', outline: 'none' }}
        placeholder="Journal Title"
      />
      <ReactQuill
        theme="snow"
        value={text}
        onChange={setText}
        modules={modules}
        className="editor"
      />
    </Container>
  );
};

export default Editor;
