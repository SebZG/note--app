import { Button } from "react-bootstrap"

import './CreateNoteButton.css';

const CreteNoteButton = ({ handleShowCreate }) => {

   return (
      <div className="create-note__btn-wrapper mb-5">
         <Button onClick={handleShowCreate} variant="outline-primary" >
            Create Note
         </Button>
      </div>
   )
}
export default CreteNoteButton;