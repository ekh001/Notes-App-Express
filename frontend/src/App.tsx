import React, { useEffect, useState } from 'react';
import logo from './logo.svg';


import { Note as NoteModel} from "./models/notes";
import Note from "./components/Note";
import { Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";

function App() {

  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
    try {
    
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

    </Container>
  );
}

export default App;
