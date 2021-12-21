import { Button, IconButton, Rating, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useState } from 'react';
import {useStore} from "../stores/Context";
import {observer} from "mobx-react";

const App = observer(() => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [newRate, setNewRate] = useState<number | null>(0);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const {todoStore} = useStore();
  const {userStore} = useStore();

  // todo 함수
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = () => {
    todoStore.addTodo(newTodo, newRate, newName); // 스토어에 로컬state 저장
    setNewRate(0);
    setNewTodo(''); // 로컬state 초기화해주기
    setOpen(false);
  }

  const handleChange = (e: { target: { value: any; }; }) => {
    const text = e.target.value;
    setNewTodo(text)
  }

  const onDelete = (id: number) => {
    todoStore.deleteTodo(id);
  }
  
  const onChangeRate = (id: number, value: any, name: string ) => {
    todoStore.changeRate(id, value, name)
  }

  const handleChangeRate = (e: any) => {
    setNewRate(e);
  }

  // login 함수
  const onLogin = () => {
    const login = userStore.loginUser(newName, newPassword);
    if(login) {
      setIsLogin(true)
    }else{
      setIsLogin(false);
    }
  }

  const onLogout = () => {
    setIsLogin(false);
  }

  const changeName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewName(e.target.value)
  }

  const changePassword = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewPassword(e.target.value)
  }

  return (
    <div>
      {!isLogin 
      ?
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <h1>Todo 로그인</h1>
        <TextField
          margin="dense"
          label="이름"
          type="text"
          variant="standard"
          value={newName}
          onChange={changeName}
        />
        <TextField
          margin="dense"
          label="패스워드"
          type="password"
          variant="standard"
          value={newPassword}
          onChange={changePassword}
        />
        <Button variant="outlined" onClick={onLogin} sx={{marginTop:5, width: 200, height: 50}}>
          로그인
        </Button>
      </div>
      :
      <>
      <Button variant="outlined" onClick={handleClickOpen}>
        추가하기
      </Button>
      <Button variant="outlined" onClick={onLogout}>
        로그아웃
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Todo Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            TO-DO를 입력하세요
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
          <Rating
            value={newRate}
            onChange={(event, newValue) => {
              handleChangeRate(newValue);
            }}
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
                if(x.name === newName){
                  return (
                    <li key={x.id}>{x.content}
                      <Rating
                        name="simple-controlled"
                        value={x.rate}
                        onChange={(event, newValue) => {
                          onChangeRate(x.id, newValue, newName);
                        }}
                      />
                      <IconButton aria-label="delete" onClick={() => onDelete(x.id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </li> 
                    )
                  }else{
                    <></>
                  }
              }
            )
          }
        </ul>
      </Typography>
      </>
      }
    </div>
  );
});


export default App;