import { LibraryAddOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type PropsType = {
  addItemCallBack: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = React.memo((props: PropsType) => {
  let [title, setTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }
    if (e.charCode === 13) {
      addTask();
    }
  };
  const addTask = () => {
    if (title.trim() !== '') {
      props.addItemCallBack(title.trim());
      setTitle('');
    } else {
      setError('Text incorrect');
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <TextField
        style={{ minWidth: '300px' }}
        helperText={error}
        value={title}
        label={'Type'}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
      />
      <Button
        style={{ marginRight: '-10px' }}
        size={'large'}
        variant={'text'}
        onClick={addTask}
        disabled={props.disabled}
      >
        <LibraryAddOutlined />
      </Button>
    </div>
  );
});
