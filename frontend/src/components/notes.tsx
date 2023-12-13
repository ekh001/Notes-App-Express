import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";

interface NoteProps {
    note: NoteModel,

}

const Note = ({ note }: NoteProps) => {

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {note.title}
                </Card.Title>
            </Card.Body>
        </Card>
    )



}

export default Note; 