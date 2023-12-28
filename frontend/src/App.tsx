import React, { useEffect, useState } from 'react';

import * as NotesApi from "./network/notes_api";


import { Note as NoteModel} from "./models/notes";
import Note from "./components/Note";
import { Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import AddNoteDialog from './components/AddNoteDialogue';

function App() {

  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
    try {
      
    const notes = await NotesApi.fetchNotes();
    
    setNotes(notes);      
    } catch (error) {
    console.error(error);
    alert(error);
      
    }
    }
    loadNotes();
  
  },[]);




  return (
    <Container>
      <Row xs={1} md={2} lg={3}
      className='g-4'>


    {notes.map(note => (
      <Col  key={note._id}>
      <Note note={note} className={styles.note} />
      </Col>
    ))}
    </Row>

    {
       showAddNoteDialog && <AddNoteDialog />
    }

    </Container>
  );
}

export default App;
