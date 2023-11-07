import React, { useState } from 'react';
import styles from '../../styles/adminPage.module.css';

const BACKEND_URL = 'http://localhost:8000/'; //TODO: move to .env
function TaskForm({ token }: { token: string | null }) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  function handleSubmit() {
    fetch(BACKEND_URL + 'tasks/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': '0',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        points,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.id === undefined) throw new Error(data.detail);
        setMessage('Task created with title: ' + data.title + ' and id: ' + data.id + '.');
        setTitle('');
        setDescription('');
        setPoints(0);
      })
      .catch((err) =>{
        setMessage("Error: " + err);
      
      });
  }

  return (
    <div>
      <div>
        <label>
          Title:
          <input
            type='text'
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            className={styles.input}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Points:
          <input
            type='number'
            className={styles.input}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </label>
        <br />
        <p
          style={{
            color: 'red',
          }}
        >
          {message}
        </p>
        <button type='submit' className={styles.button} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}


export default TaskForm;