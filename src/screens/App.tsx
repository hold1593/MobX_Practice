import { Button, IconButton, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useEffect, useState } from 'react';
import {useStore} from "../stores/Context";
import {observer} from "mobx-react";

const App = observer(() => {
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const {todoStore} = useStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = () => {
    todoStore.addTodo(newTodo); // 스토어에 로컬state 저장
    setNewTodo(''); // 로컬state 초기화해주기
    setOpen(false);
  }

  const onDelete = (id: number) => {
    todoStore.deleteTodo(id);
  }

  const onChangeTodo = (id: number,content: string) => {
    todoStore.changeTodo(id, content)
  }

  const handleChange = (e: { target: { value: any; }; }) => {
    const text = e.target.value;
    setNewTodo(text)
  }

  return (
    <>
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Todo 추가폼</DialogTitle>
        <DialogContent>
          <DialogContentText>
            추가할 TO-DO를 입력하세요
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="내용"
            type="text"
            fullWidth
            variant="standard"
            value={newTodo}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleComplete}>완료</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h6" gutterBottom component="div">
        <ul>
          {
            todoStore.todos.map(
              (x: any) => {
                return (
                <li key={x.id}>{x.content}
                  <IconButton aria-label="delete" onClick={() => onDelete(x.id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </li> 
                )
              }
            )
          }
        </ul>
      </Typography>
    </div>
    </>
  );
});


export default App;