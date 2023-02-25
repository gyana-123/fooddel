import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Select from '@mui/material/Select';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
        })(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FoodItem =( props)=> {
 
  const [expanded, setExpanded] = React.useState(false);
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  let option = props.option;
  let priceObtion = Object.keys(option);
  // console.log(option,"op")

  
  return (

   
    
    <Card sx={{ maxWidth: 345 , margin:"12px" }}>
      <CardHeader
        avatar={
          <box sx={{ bgcolor: red[500] }} aria-label="recipe">
            
          </box>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.foodname}
        // subheader="spicy and tasty"
      />
      <CardMedia
        component="img"
        height="194"
        image={props.imgsrc}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.des}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
       <Select sx={{ m: 2 }} native defaultValue="" id="grouped-native-select"  >
            {
                Array.from(Array(6),(e,i) => {
                    return ( <option key={i+1} value={i+1}> {i+1}</option>
                
                )})
            }

        </Select>
        <Select native defaultValue="" id="grouped-native-select" >
            {priceObtion.map((data)=> {
              return <option key={data} value={data}>{data}</option>
            })
            }
            
            </Select> 

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        

       

         
          
        </CardContent>
      </Collapse>
    </Card>)}
  

export default FoodItem;