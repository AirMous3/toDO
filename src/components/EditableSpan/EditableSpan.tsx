import TextField from '@mui/material/TextField/TextField';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { RequestStatusType } from '../../state/redux/app-Reducer';

type EditableSpanPropsType = {
 title: string;
 onChangeCallBack: (title: string) => void;
 entityStatus?: RequestStatusType;
 entityTaskStatus?: RequestStatusType;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
 console.log('SPAN RENDER');
 let [editMode, setEditMode] = useState(false);
 let [title, setTitle] = useState('');

 const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
  setTitle(e.currentTarget.value);
 };

 const changeEditMode = () => {
  setEditMode(true);
  setTitle(props.title);
 };
 const onBlurEffect = () => {
  setEditMode(false);
  props.onChangeCallBack(title);
 };
 const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.charCode === 13) {
   setEditMode(false);
   props.onChangeCallBack(title);
  }
 };

 return editMode ? (
  <TextField
   disabled={props.entityStatus === 'loading' || props.entityTaskStatus === 'loading'}
   onKeyPress={onKeyPressHandler}
   onBlur={onBlurEffect}
   autoFocus
   onDoubleClick={changeEditMode}
   onChange={onChangeTitleHandler}
   value={title}
  />
 ) : (
  <span onDoubleClick={changeEditMode}>{props.title}</span>
 );
});
