import { Form, Modal, Button } from "react-bootstrap";
import { Note } from "../models/notes";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}

const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {

    const {register, handleSubmit, formState : { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input: NoteInput ) {

        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }           
            onNoteSaved(noteResponse);
            
        } catch (error) {
            console.log(error);
            alert(error);
            
        }
        
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>

                    <TextInputField 
                    name="title"
                    label="Title"
                    type="text"
                    placeholder="Title"
                    register={register}
                    registerOptions={{ required: "Required"}}
                    error={errors.title}

                    />

                    <TextInputField 
                    name="text"
                    label="Text"
                    as="textarea"
                    rows={5}
                    placeholder="Text"
                    register={register}
                    />
                    {/* <Form.Group className="mb-3">
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control 
                        type="text"
                        placeholder="Title"
                        isInvalid={!!errors.title}
                        {...register("title", { required: "Required" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}

                        </Form.Control.Feedback>

                    </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                        <Form.Label>
                            Text
                        </Form.Label>
                        <Form.Control 
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        {...register("text")}
                        />

                    </Form.Group> */}
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                type="submit"
                form="addEditNoteForm"
                disabled={isSubmitting}>
                    Submit Note
                </Button>
            </Modal.Footer>

        </Modal>
     );
}
 
export default AddEditNoteDialog;