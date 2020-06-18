import React, { Fragment, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  ListItem,
  Grid,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  TextareaAutosize,
  Button,
  Dialog,
  DialogTitle,
} from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import { I18N, I18N_NS } from '../_i18n'
import { getDialogMessageList } from './_store/messageDialogSlice'
import { RootState } from '../../../app/store'
import { DialogMessage, GetDialogMessageListRes } from './_controller/_types'

const useStyles = makeStyles(theme => ({
  blank: {},
  contentWindow: {
  },
  itemTitle: {
    marginRight: theme.spacing(5)
  },
  contentLeft: {
    padding: theme.spacing(0,6)
  },
  contentRight: {
    padding: theme.spacing(0,6),
    textAlign: 'right'
  },
  avatarLeft: {
    position: 'absolute',
    left: '0'
  },
  avatarRight: {
    position: 'absolute',
    right: '0'
  },
  marginCenter: {
    margin: theme.spacing(1, 'auto')
  },
  inputWindow: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(3, 1),
    borderTop: '1px solid #ddd'
  },
  inline: {
    display: 'inline',
  },
  hide: {
    display: 'none'
  },
  date: {
    color:'#999',
    fontSize: '14px'
  },
  textarea: {
    width: '80%',
    height: '200px',
    marginBottom: theme.spacing(2)
  },
  inputBtn: {
    marginRight: theme.spacing(2),
    display: 'inline'
  }
}))

export function RenderItems(props:{data:GetDialogMessageListRes}) {
  // const {t} = useTranslation(I18N_NS)
  const classes = useStyles()
  return (
    <Box>
      {
        props.data.dialogMessageList.map((item:DialogMessage) => {
          return (
            <ListItem className={classes.blank} key={item.id}>
              <Grid container direction={item.type === 1 ? 'row' : 'row-reverse'}>
                <ListItemAvatar className={item.type === 1 ? classes.avatarLeft : classes.avatarRight}>
                  <Avatar className={classes.marginCenter} alt="Remy Sharp" src={item.avatar} />
                </ListItemAvatar>
                <Grid item xs={12}>
                  <ListItemText
                    primary={
                      <Fragment>
                        {item.name}<span className={classes.date}>{` - ${item.time}`}</span>
                      </Fragment>}
                    className={item.type === 1 ? classes.contentLeft : classes.contentRight}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {item.content}
                        </Typography>
                      </Fragment>
                    }
                  />
                </Grid>
              </Grid>
            </ListItem>
          )
        })
      }
    </Box>
  )
}

const connector = connect(
  (state: RootState) => {
    const { isLoading, dialogMessageList } = state.MDialogSlice
    return {
      isLoading,
      dialogMessageList
    }
  },
  { getDialogMessageList }
)

export type Props = ConnectedProps<typeof connector>

export const MessageDialog = connector(_MessageDialog)
export function _MessageDialog({
  isLoading,
  dialogMessageList,
  getDialogMessageList
}: Props) {
  const classes = useStyles()
  const curCustomerId = 22
  // const dispatch = useDispatch()
  // let favorites = useSelector(selectFavorites)
  const [open, setOpen] = useState(true)
  useEffect(() => {
    getDialogMessageList(curCustomerId)
  }, [getDialogMessageList])
  function handleClose () {
    setOpen(false)
  }
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      {isLoading?'isLoading':null}
      <Box>
        <Box className={classes.contentWindow}>
          <RenderItems data={dialogMessageList} />
        </Box>
        <Box display="flex" className={classes.inputWindow}>
          <Grid container>
            <Grid item xs={12}>
              <TextareaAutosize
                className={classes.textarea}
                rows={5}
                placeholder="请输入消息"
              />
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.inputBtn}>
                <input accept="image/*" className={classes.hide} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                  <Button variant="contained" color="primary">上传图片</Button>
                </label>
              </Box>
              <Button className={classes.inputBtn} variant="contained" color="primary">发送消息用户处理</Button>
              <Button className={classes.inputBtn} variant="contained" color="primary">发送消息继续处理</Button>
              <Button className={classes.inputBtn} variant="contained" color="primary">关闭消息</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  )
}
