import React from "react"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

export default function App() {
    const [notes, setNotes] = React.useState(()=>JSON.parse(localStorage.getItem("notes"))||[])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    React.useEffect(()=>{
      localStorage.setItem("notes",JSON.stringify(notes));
    },[notes])
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => {
            const newArray = [];
            for(let i = 0 ; i < oldNotes.length;i++){
                const oldNote = oldNotes[i];
                if(oldNote.id==currentNoteId){
                    newArray.unshift( { ...oldNote, body: text });
                }else{
                    newArray.push(oldNote);
                }
            }
            return newArray;
        }
        
        )
    }

    // oldNotes.map(oldNote => {
    //     return oldNote.id === currentNoteId
    //         ? { ...oldNote, body: text }
    //         : oldNote
    // }
    
    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(oldNotes=>oldNotes.filter(note=>note.id!==noteId))
    }


    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                   
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}






























// import React from "react";
// import Card from "./Card";
// import Form from "./Form";
// import Joke from './Joke';
// import JokesData from "./JokesData";
// import PersonData from './PersonData';

// function App(){
//   const personElements = JokesData.map(function(person){
//     return(
//         <Joke {...person}/>
//     )
//   })

//    return(
//      <div>
//       <Form/>
     
//      </div>
//    )
// }



// export default App;



// <Card 
// {...person}
//   />


//{personElements}
// img={person.img}
//      rating={person.rating}
//      reviewCount={person.reviewCount}
//      place={person.place}
//      title={person.title}
//      price={person.price}