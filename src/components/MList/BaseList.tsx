import React, { FunctionComponent, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, ListItemIcon, Button, ListSubheader } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles((theme:Theme) => ({
  img: {
    height: '80px',
    margin: theme.spacing(0)
  },
  title: {
    margin: '0 0 36px'
  },
  info: {
    width: '30%',
    margin: '0 20px'
  },
  price: {
    width: '30%'
  }
}));

type RenderListProps = {
  [propName: string]: any
}

type itemTypes = {
  title: string,
  desc: string,
  id: number,
  price: number,
}

function RenderList(props:RenderListProps) {
  const classes = useStyles()
  const [checked, setChecked] = useState([-1])

  const handleToggle = (value:number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  return (
    <List>
      <ListSubheader>Shop Cart</ListSubheader>
      {
        props.listData.map((item:itemTypes) => {
          return (
            <ListItem button key={item.id}>
              <ListItemIcon>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(item.id)}
                  checked={checked.indexOf(item.id) !== -1}
                />
              </ListItemIcon>
              <ListItemIcon>
                <img className={classes.img} src={require("./icon.png")} alt=""/>
              </ListItemIcon>
              <ListItemText className={classes.info} primary={<h5 className={classes.title}>{item.title}</h5>} secondary={<span>{item.desc}</span>} />
              <ListItemText className={classes.price} primary={<b>${item.price}</b>} />
              <ListItemSecondaryAction>
              <Button variant="contained" color="primary" size="small">
                Buy it
              </Button>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })
      }
    </List>
  )
}

export const BaseList: FunctionComponent = () => {
  const listData = [{
    title: 'Product Name',
    desc: 'Product Description',
    price: 1000,
    id: 1
  },{
    title: '22',
    desc: 'bbb',
    price: 2000,
    id: 2
  },]
  const handleSwitch = () => {
    // TODO: switch pages
  }
  return (
    <Box>
      <RenderList listData={listData}/>
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handleSwitch} />
    </Box>
  )
}