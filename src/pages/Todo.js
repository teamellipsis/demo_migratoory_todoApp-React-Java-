import React from 'react';
import PropTypes from 'prop-types';
import connecter from '../middleware/connecter'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from "@material-ui/core/styles";

import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';

import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import {DatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomCard from './CustomCard'
const useStyles = theme => ({
  card: {
    width: "30%",
    marginTop: '70px',
   
  },
  divcard: {
    display:'flex', 
    justifyContent:'center' 
   
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  formcontainer: {
    display: 'flex',
    flexWrap: 'wrap',
    
  },
  grow: {
      flexGrow: 1,
  },
  search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
      },
  },
  inputRoot: {
      color: 'inherit',
      width: '100%',
  },
  inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


class Todo extends React.Component {
    constructor(props) {
      super(props);
      this.textRef = React.createRef();
      this.state = {date:"test",open: false, UpdateDialog: false,statedata:[],currenttask:{},RemoveDialog:false,DoneDialog:false};
      this.handleOnClick = this.handleOnClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
      var month =new Date().getMonth()+1
      var date = new Date().getDate()
      if(month<10){
        var month="0"+new Date().getMonth()
      }
      if(date<10){
        var date="0"+new Date().getDate()
      }
      this.date = new Date().getFullYear()+"-"+month+"-"+date
      console.log(this.date)
      this.handleChange_title = this.handleChange_title.bind(this);
      this.handleChange_description = this.handleChange_description.bind(this);
      this.handleChange_date = this.handleChange_date.bind(this);
    
      this.handleClick = this.handleClick.bind(this);
     
    }

    handleChange_title(event) {
      this.setState({txvalue_title: event.target.value});
    }
    handleChange_description(event) {
      this.setState({txvalue_description: event.target.value});
    }
    handleChange_date(event) {
      this.setState({txvalue_date: event.target.value});
      console.log(this.state.txvalue_date)
    }
    

   handleClickOpen() {
    
    this.setState(state => ({
      open: true ,
      txvalue_date:this.date
    }));
    }
  
   handleClose() {
    // this.setState({setOpen: false })
    this.setState(state => ({
      open: false 
    }));
    }
  
    UpdateDialogOpen(task) {
    
      this.setState(state => ({
        UpdateDialog: true ,
        currenttask: task,
        txvalue_title:task.title,
        txvalue_description:task.description,
        txvalue_date:task.date

      }));
      console.log("current key is............"+task.id);
      }
    
    UpdateDialogClose() {
    // this.setState({setOpen: false })
    this.setState(state => ({
      UpdateDialog: false 
    }));
    }


    RemoveDialogOpen(task) {
    
      this.setState(state => ({
        RemoveDialog: true ,
        currenttask: task,
        

      }));
      console.log("current key is............"+task.id);
      }
    
      RemoveDialogClose() {
    this.setState(state => ({
      RemoveDialog: false 
    }));
    }


    DoneDialogOpen(task) {
    
      this.setState(state => ({
        DoneDialog: true ,
        currenttask: task,
        

      }));
      console.log("current key is............"+task.id);
      }
    
    DoneDialogClose() {
      this.setState(state => ({
        DoneDialog: false 
      }));
    }


    handleOnClick = () => {
      let todoText = this.textRef.current.value;
      this.textRef.current.value = "";
  };
    componentWillMount(){
      this.connection = new WebSocket('ws://127.0.0.1:4444')
      var feed = {operation:"getdata"}
      var sendstring=JSON.stringify(feed)
      this.connection.onopen=()=>{
        console.log("connection is opened ")
       
    }  
     
        this.connection .onmessage =(e)=>{
          console.log(e)
          this.setserver(e.data);
         
      }
     
     
      
    }


    handleClick(method) {
      console.log(method)
      var feed = {method:method,title:this.state.txvalue_title,description:this.state.txvalue_description,date:this.state.txvalue_date,id:this.state.currenttask.id}
      var sendstring=JSON.stringify(feed)
      console.log(sendstring)
      this.connection.send(sendstring)
 
      this.handleClose()
      this.UpdateDialogClose()
      this. RemoveDialogClose()
      this.DoneDialogClose()
      this.setState(state => ({
        txvalue_title: "",
        txvalue_description:"",
        txvalue_date:""
        
      }));
    }
    setserver( e) {
      console.log('statedata '+ e);
        this.setState({server: e});
        this.setState({statedata: JSON.parse(e)});
        console.log(this.state.statedata)
        
      }
    render() {
      const { classes } = this.props;
      console.log("statedata is"+this.state.statedata)
      var namesList = this.state.statedata.map(function iterator(name){
                      return <ListItem>
                                {/* <Card >{name.description}                                                                   
                                </Card> */}
                                <Card>
                                <CardContent>
                                <CustomCard key={name.id} open={name} conn={this.connection} parentMethod={this.get1} data={this.state.statedata}/>
                                </CardContent>
                                <CardActions>
          {/* <Button size="small" color='primary' onClick={this.handleOnClick(this.props.open.id)}>Update</Button> */}
                                  <Button size="small" color='secondary' onClick= {() => this.RemoveDialogOpen(name)}>Delete</Button>
                                  <Button size="small" color='primary' onClick= {() => this.UpdateDialogOpen(name)} >Update</Button>
                                  <Button size="small" onClick= {() => this.DoneDialogOpen(name)} >Done</Button>
                                  
                                </CardActions>
                                </Card>
                        </ListItem>
                        
                    },this)
      return (
        <React.Fragment>
         <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Todo App
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton onClick={this.handleClickOpen.bind(this)} color="inherit" aria-label="Open drawer">
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>


            <div>
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen.bind(this)}>
        Open full-screen dialog
      </Button>

      <List>{ namesList }</List>
      <Dialog fullScreen open={this.state.open} onClose={this.handleClose.bind(this)} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            
            <Typography variant="h6" className={classes.title}>
              Add New Todo
            </Typography>
            <div className={classes.toolbarButtons}>
            <IconButton edge="start" color="inherit" onClick={this.handleClose.bind(this)} aria-label="close">
              <CloseIcon />
            </IconButton>
            </div>
            {/* <Button color="inherit" onClick={this.handleClose.bind(this)}>
              
            </Button> */}
          </Toolbar>
        </AppBar>
  
        <div className={classes.divcard}>
         <Card className={classes.card}>
          <CardContent >
          <form className={classes.formcontainer} >
            <TextField
                id="outlined-name"
                label="Title"
                value= {this.state.txvalue_title}
                onChange={this.handleChange_title}
                margin="normal"
                variant="outlined"
                
            />
             <br />
            <TextField
                id="outlined-name2"
                label="Description"
                value= {this.state.txvalue_description}
                onChange={this.handleChange_description}
                margin="normal"
                variant="outlined"
            />
             <br />
            <TextField
                id="outlined-name3"
                label="Pick Date "
                type="date"
                value= {this.state.txvalue_date}
                onChange={this.handleChange_date}
                margin="normal"
                variant="outlined"
                // defaultValue={this.date }
                InputLabelProps={{
                  shrink: true,
                }}
            />
          </form>
          </CardContent>
          <CardActions style={{justifyContent: 'center'}}>
          {/* <Button variant="contained" > ADD TODO</Button> */}
          <Button variant="contained" onClick={()=>this.handleClick("AddTodo")}> ADD TODO</Button>
          </CardActions>
          
          </Card>
          </div>
      </Dialog>

      <Dialog open={this.state.UpdateDialog} onClose={this.UpdateDialogClose.bind(this)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter new fields for Task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter new title"
            onChange={this.handleChange_title}
            value= {this.state.txvalue_title}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter new Description"
            onChange={this.handleChange_description}
            value= {this.state.txvalue_description}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="date"
            label="Enter new Date"
            // defaultValue={this.date }
            onChange={this.handleChange_date}
            value= {this.state.txvalue_date}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.UpdateDialogClose.bind(this)} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>this.handleClick("UpdateTodo")} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={this.state.RemoveDialog} onClose={this.RemoveDialogClose.bind(this)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Remove Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete task: {this.state.currenttask.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.RemoveDialogClose.bind(this)} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>this.handleClick("RemoveTodo")} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={this.state.DoneDialog} onClose={this.DoneDialogClose.bind(this)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Complete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to complete task: {this.state.currenttask.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.DoneDialogClose.bind(this)} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>this.handleClick("DoneTodo")} color="primary">
            Complete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
           
        </React.Fragment>
      );
    }
    test(){
      var feed = {operation:"getdata"}
      var sendstring=JSON.stringify(feed)
      this.connection .send(sendstring)
      return this.setState({date:"shehan"});
    }

    close(){
      this.connection.close()
    }
  }

  export default withStyles(useStyles)(Todo)