import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';



  const styles = {
    card: {
        minWidth: 275,
        textAlign:"left",
        marginBottom: '4px',
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(2.0)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      bullet1: {
          display: 'inline-block',
          fontSize: 14,
          color:"textSecondary",
          marginLeft:12,
          marginRight: '30px',
        },
    button:{
        maxWidth:'30px',
        maxHeight:'15px',
    },
  };

  class CustomCard extends React.Component{
    constructor(props) {
        super(props);
    }


    render(){
        const {classes} = this.props;
        const bull = <span className={classes.bullet}>•</span>;
  
    return (
        <div>
      
     
        <CardContent>
          <Typography >{bull}<span >Title:</span><span m={2}  className={classes.bullet1}>
          {"  "+this.props.open.title }
          </span>
          </Typography>
          <Typography >{bull}<span >Description:</span><span m={2}  className={classes.bullet1}>
          {"  "+this.props.open.description }
          </span>
         
          </Typography>
          <Typography >{bull}<span >Date:</span><span m={2}  className={classes.bullet1}>
          {"  "+this.props.open.date }
          </span>
          </Typography>
          <Typography >{bull}<span >id:</span><span m={2}  className={classes.bullet1}>
          {"  "+this.props.open.id }
          </span>
          </Typography>
          <Typography >{bull}<span >State:</span><span m={2}  className={classes.bullet1}>
          {"  "+this.props.open.state }
          </span>
          </Typography>
        </CardContent>
      
     </div>
    );
  }
}

  export default withStyles(styles)(CustomCard);