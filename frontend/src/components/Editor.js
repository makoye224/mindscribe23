import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../context/context';
import RichTextEditor from './RichTextEditor';
import JournalDisplay from './JournalDisplay';



const Editor = () => {
  const { id } = useParams() || localStorage.getItem('currentJournalEntryId');
  const { journals, setJournals } = useStateContext();
  const [edit, setEdit] = useState(false)

  useEffect(()=>{

  }, [id])
  // Find the selected journal entry based on the id
  const selectedJournalEntry = journals.find((entry) => entry.id == id);

  const [journalName, setJournalName] = useState(selectedJournalEntry?.title);
  const [text, setText] = useState(selectedJournalEntry?.contents);

  // Use useEffect to automatically save changes to the journals state
  useEffect(() => {
    // Update your journals state here if needed
  }, [journalName, text]);

  const handleJournalNameChange = (event) => {
    setJournalName(event.target.value);
  };

  const handleSave = ()=>{

  }
 

  return (
    <Container className="editor-container">
      <br />
      <JournalDisplay entry = {selectedJournalEntry }/>
      <Button variant={edit ? 'secondary' : 'primary'} onClick={()=>{setEdit(!edit)}}>{!edit ? 'Open Editor' : 'Close Editor'}</Button>
      <br/>
      {edit ? (<>
        <br/>
        <input
        type="text"
        value={journalName}
        onChange={handleJournalNameChange}
        style={{ border: 'none', outline: 'none' }}
        placeholder="Journal Title" /><RichTextEditor entry={selectedJournalEntry} />
        <br/>
          <Button onClick={handleSave} variant='success'>Save</Button>
        </>):(null)}
    </Container>
  );
};

export default Editor;
