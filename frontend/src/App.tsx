import React, { useEffect, useState } from 'react';

import * as NotesApi from "./network/notes_api";


import { Note as NoteModel} from "./models/notes";
import Note from "./components/Note";
import { Col, Container, Row, Button } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/Utils.module.css";
import AddEditNoteDialog from './components/AddEditNoteDialogue';
import {FaPlus} from "react-icons/fa";

function App() {

  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

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

  async function deleteNote(note:NoteModel) {

    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id))
      
    } catch (error) {
      console.log(error);
      alert(error);
      
    }
    
  }




  return (
    <Container>
    <Button 
    className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
    onClick={() => setShowAddNoteDialog(true)}>
      <FaPlus />
      Add new note
      
    </Button>
      <Row xs={1} md={2} lg={3}
      className='g-4'>


    {notes.map(note => (
      <Col  key={note._id}>
      <Note note={note} 
      className={styles.note}
      onNoteClicked={setNoteToEdit}
      
      onDeleteNoteClicked={deleteNote} />
      </Col>
    ))}
    </Row>

    {
       showAddNoteDialog && <AddEditNoteDialog 
       onDismiss={() => setShowAddNoteDialog(false)}
       onNoteSaved={(newNote) => {
        setNotes([...notes, newNote]);
        setShowAddNoteDialog(false);
       }}/>

       
    }
    {noteToEdit && 
    <AddEditNoteDialog 
    noteToEdit={noteToEdit}
    onDismiss={() => setNoteToEdit(null)}
    onNoteSaved={(updatedNote) => {
      setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));

      setNoteToEdit(null);
    }}
    />}

    </Container>
  );
}

export default App;
