/**
 * @description Component to display Notes
 * @author Yash
 * @since 8/12/18
 * @version 1.12
 */

import React from 'react';
import { Card, Chip, Snackbar, IconButton } from '@material-ui/core';
import NoteService from '../service/NoteService';
import ReminderPopper from './ReminderPopper';
import ColorSection from './ColorSection';
import ArchiveNote from './ArchiveNote';
import MoreOptions from './MoreOptions';
import PinNote from './PinNote';
import CloseIcon from '@material-ui/icons/Close';
import AddNotes from './AddNotes';
// import NoteServiceClass from '../service/NoteServiceClass';
const NoteServiceClass = require('../service/NoteServiceClass');

const NoteServiceClassObject = new NoteServiceClass.NoteServiceClass();

export default class NotesDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notesDisplay: [],
            snackbarStatus: false,
            snackbarMessage: "Reminder!"
        }
    }

    getBackGroundColor = (colorSelected, note) => {
        let newNotesArray = this.state.notesDisplay;
        console.log('note selected ---------', note);

        let request = {
            thread: "/updateNoteColor",
            data: {
                note: {
                    _id: note._id,
                    color: colorSelected
                }
            }
        }

        /**
         * @description This is for generic Updation
         */
        // NoteService.NotesUpdation(request);

        NoteServiceClassObject.NotesUpdation(request);

        for (let i = 0; i < newNotesArray.length; i++) {
            if (note._id === newNotesArray[i]._id) {
                newNotesArray[i].color = colorSelected

                this.setState({
                    notesDisplay: newNotesArray
                })
            }
        }
    }

    getReminder = (reminderSet, note) => {
        let newNotesArray = this.state.notesDisplay;
        console.log('reminder set', reminderSet);

        let request = {
            thread: "/updateNoteReminder",
            data: {
                note: {
                    _id: note._id,
                    reminder: reminderSet
                }
            }
        }

        NoteServiceClassObject.NotesUpdation(request);

        for (let i = 0; i < newNotesArray.length; i++) {
            if (note._id === newNotesArray[i]._id) {
                newNotesArray[i].reminder = reminderSet

                this.setState({
                    notesDisplay: newNotesArray
                })
            }
        }
    }

    getReminderRemoved = (note) => {
        let newNotesArray = this.state.notesDisplay;

        let request = {
            thread: "/updateNoteReminder",
            data: {
                note: {
                    _id: note._id,
                    reminder: ""
                }
            }
        }

        NoteServiceClassObject.NotesUpdation(request);

        for (let i = 0; i < newNotesArray.length; i++) {
            if (note._id === newNotesArray[i]._id) {
                newNotesArray[i].reminder = ""

                this.setState({
                    notesDisplay: newNotesArray
                })
            }
        }
    }

    getPin = (pinSet, note) => {
        let newNotesArray = this.state.notesDisplay;

        let request = {
            thread: "/updateNoteReminder",
            data: {
                note: {
                    _id: note._id,
                    pin: pinSet
                }
            }
        }

        NoteServiceClassObject.NotesUpdation(request);

        for (let i = 0; i < newNotesArray.length; i++) {
            if (note._id === newNotesArray[i]._id) {
                newNotesArray[i].pin = pinSet

                this.setState({
                    notesDisplay: newNotesArray
                })
            }
        }
    }

    getNewNote = () => {
        let newNotesArray = this.state.notesDisplay;
        newNotesArray.push(this.props.getNewNote);
        this.setState({
            notesDisplay: newNotesArray
        })
    }

    componentDidMount() {
        // console.log('localStorage.getItem("userLogged")------', localStorage.getItem("userLoggedId"));

        let request = {
            thread: "/noteDisplay",
            data: {
                userId: localStorage.getItem("userLoggedId")
            }
        }



        var self = this;

        NoteService.NoteDisplay(request, (err, data) => {

            if (data !== null && data !== undefined) {
                self.setState({
                    notesDisplay: data
                })
            }
            else {
                self.setState({
                    notesDisplay: []
                })
            }
        });

    }

    render() {
        return (

            <div className={this.props.sidebarStatus ? "NotesDisplayDivSidebarOpen" : "NotesDisplayDivSidebarClose"} >



                <div className={this.props.notesView ? "notesGridDisplayDiv" : "notesListDisplayDiv"} >

                    {/* <span className="pinnedNoteTitle" >Pinned Notes</span> */}

                    {this.state.notesDisplay.map((option, index) => (

                        <div key={index} >

                            {option.trash ? (
                                <div>
                                </div>
                            ) : (
                                    <div>

                                        {option.pin ? (
                                            <div className="pinnedNoteDiv" >
                                                <Card className={this.props.notesView ? "notesGridDisplayCard" : "notesListDisplayCard"} >

                                                    <div style={{ backgroundColor: option.color, width: "-webkit-fill-available" }} >
                                                        <div className="noteCardDisplayTitle" >
                                                            {option.title}
                                                            <PinNote noteSelected={option} getPin={this.getPin} getNotePin={option.pin} />
                                                        </div>
                                                        <div className="noteCardDisplayDescription" >
                                                            {option.description}
                                                        </div>

                                                        {option.reminder === "" ? (
                                                            <div>
                                                            </div>
                                                        ) : (
                                                                <div >
                                                                    <Chip
                                                                        icon={<img className="reminderClock" src={require('../assets/images/clocktime.svg')} alt="reminderClock" />}
                                                                        label={<span className="reminderShowOnCardText" >  {option.reminder} </span>}
                                                                        onDelete={() => this.getReminderRemoved(option)}
                                                                        variant="outlined"
                                                                        className="chipOnCardReminder"
                                                                    />
                                                                </div>
                                                            )}

                                                        <div>
                                                            <ReminderPopper getReminderChooseOption={this.getReminder} noteSelected={option} />
                                                            <img className="noteAddFeatureImages" src={require('../assets/images/personAdd.svg')} alt="addPerson" />
                                                            <ColorSection getColor={this.getBackGroundColor} noteSelected={option} />
                                                            <img className="noteAddFeatureImages" src={require('../assets/images/imageAdd.svg')} alt="uploadImage" />
                                                            <ArchiveNote />
                                                            <MoreOptions />
                                                        </div>
                                                    </div>

                                                </Card>
                                            </div>
                                        ) : (
                                                <div className="OtherNoteShowDiv" >
                                                    <Card className={this.props.notesView ? "notesGridDisplayCard" : "notesListDisplayCard"} >

                                                        <div style={{ backgroundColor: option.color, width: "-webkit-fill-available" }} >
                                                            <div className="noteCardDisplayTitle" >
                                                                {option.title}
                                                                <PinNote noteSelected={option} getPin={this.getPin} getNotePin={option.pin} />
                                                            </div>
                                                            <div className="noteCardDisplayDescription" >
                                                                {option.description}
                                                            </div>
                                                            {option.reminder === "" ? (
                                                                <div>
                                                                </div>
                                                            ) : (
                                                                    <div >
                                                                        <Chip
                                                                            icon={<img className="reminderClock" src={require('../assets/images/clocktime.svg')} alt="reminderClock" />}
                                                                            label={<span className="reminderShowOnCardText" >  {option.reminder} </span>}
                                                                            onDelete={() => this.getReminderRemoved(option)}
                                                                            variant="outlined"
                                                                            className="chipOnCardReminder"
                                                                        />
                                                                    </div>
                                                                )}
                                                            <div>
                                                                <ReminderPopper getReminderChooseOption={this.getReminder} noteSelected={option} />
                                                                <img className="noteAddFeatureImages" src={require('../assets/images/personAdd.svg')} alt="addPerson" />
                                                                <ColorSection getColor={this.getBackGroundColor} option={option} />
                                                                <img className="noteAddFeatureImages" src={require('../assets/images/imageAdd.svg')} alt="uploadImage" />
                                                                <ArchiveNote />
                                                                <MoreOptions />
                                                            </div>
                                                        </div>


                                                    </Card>

                                                </div>

                                            )}

                                    </div>
                                )}


                        </div>

                    ))}

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackbarStatus}
                        autoHideDuration={6000}
                        onClose={this.handleSnackClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        color="primary"
                        variant="success"
                        message={<span id="message-id">{this.state.snackbarMessage}</span>}
                        action={[
                            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleSnackClose} >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />

                </div>

            </div>
        )
    }
}