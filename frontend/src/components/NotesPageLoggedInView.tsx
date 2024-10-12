import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/notes";
import * as NotesApi from "../network/notes_api";
import stylesUtils from "../styles/Utils.module.css";
import AddEditNoteDialog from "./AddEditNoteDialogue";
import Note from './Note';
import styles from "../styles/NotesPage.module.css";

const NotesPageLogggedInView = () => {

    const [notes, setNotes] = useState<NoteModel[]>([]);

    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

    useEffect(() => {
        async function loadNotes() {
        try {
          setShowNotesLoadingError(false);
          setNotesLoading(true);
          
          const notes = await NotesApi.fetchNotes();
          
          setNotes(notes);      
        } catch (error) {
          console.error(error);
          setShowNotesLoadingError(true);   
        } finally {
          setNotesLoading(false);
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
    
      const notesGrid = 
        <Row xs={1} md={2} lg={3}
        className={`g-4 ${styles.noteGrid}`}>
          {notes.map(note => (
            <Col  key={note._id}>
              <Note note={note} 
              className={styles.note}
              onNoteClicked={setNoteToEdit}
              onDeleteNoteClicked={deleteNote} />
            </Col>
          ))}
        </Row>


    return ( 
        <>
        <Button 
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}>
        <FaPlus />
        Add new note
        
        </Button>

        {notesLoading && <Spinner animation='border' variant='primary' /> }
        {showNotesLoadingError && <p>Something went wrong. Please try to refresh the page.</p>}

        {!notesLoading && !showNotesLoadingError && 
        <>
        {
        notes.length > 0
            ? notesGrid
            : <p>You don't have any notes yet.</p>
        }
        </>}


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
        </>
     );
}
 
export default NotesPageLogggedInView;