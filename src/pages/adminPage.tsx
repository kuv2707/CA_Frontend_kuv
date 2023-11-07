import { useEffect, useState } from 'react';
import styles from '../styles/adminPage.module.css';
import TaskList from '@/components/AdminPage/TaskList';
import TaskForm from '@/components/AdminPage/TaskForm';
function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loginTime, setLoginTime] = useState<Date>(new Date());

  const [selected, setSelected] = useState<string>('login');
  const options = ['login', 'All Tasks', 'Add Task'];

  return (
    <div className={styles.container}>
      <Tabs
        options={options}
        selected={selected}
        setSelected={setSelected}
      ></Tabs>
      {selected === 'login' ? (
        <Login
          token={token}
          setToken={setToken}
          loginTime={loginTime}
          setLoginTime={setLoginTime}
        ></Login>
      ) : selected === 'All Tasks' ? (
        <TaskList token={token}></TaskList>
      ) : selected === 'Add Task' ? (
        <TaskForm token={token}></TaskForm>
      ) : (
        <div>Never</div>
      )}
    </div>
  );
}
const BACKEND_URL = 'http://localhost:8000/'; //TODO: move to .env
function Login({
  token,
  setToken,
  loginTime,
  setLoginTime,
}: {
  token: string | null;
  setToken: Function;
  loginTime: Date;
  setLoginTime: Function;
}) {
  const [username, setUsername] = useState<string>('ADMIN');
  const [password, setPassword] = useState<string>('');
  const [lInterval, setLInterval] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    //update loginTime
    let k = setInterval(() => {
      setLInterval(
        Math.floor((new Date().getTime() - loginTime.getTime()) / 1000)
      );
    }, 1000);
    return () => clearInterval(k);
  }, [loginTime]);
  function handleClick() {
    fetch(BACKEND_URL + 'auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '0',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid username or password');
        return res.json();
      })
      .then((data) => {
        setToken(data.access);
        setLoginTime(new Date());
        setMessage('');
      })
      .catch((err) => {
        setMessage('Error: ' + err.message);
        setToken(null);
      });
  }
  return (
    <div className={styles.loginContainer}>
      <div>
        <label htmlFor='username' className={styles.label}>
          Username
        </label>
        <input
          type='text'
          className={styles.input}
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password' className={styles.label}>
          Password
        </label>
        <input
          type='password'
          className={styles.input}
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        Status:
        {token === null
          ? 'Not logged in'
          : `Logged in ${Math.floor(lInterval / 60)} minutes ago`}
      </div>
        <p style={{
            color: 'red',
        }}>{message}</p>
      <button className={styles.button} onClick={handleClick}>
        Login
      </button>
    </div>
  );
}

function Tabs({
  options,
  selected,
  setSelected,
}: {
  options: string[];
  selected: string;
  setSelected: Function;
}) {
  return (
    <div className={styles.navbar}>
      <h1 className={styles.heading}>Admin Page</h1>
      {options.map((option, index) => {
        return (
          <button
            key={index}
            className={
              styles.button + ' ' + (selected === option ? styles.active : '')
            }
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default AdminPage;
