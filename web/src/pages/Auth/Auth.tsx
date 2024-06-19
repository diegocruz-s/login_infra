import { useState } from 'react';
import styles from './main.module.css';

export const Auth = () => {
  const [datasLogin, setDatasLogin] = useState({
    email: '',
    password: '',
  });

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(datasLogin);
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setDatasLogin(prev => {
      const newDatas = { ...prev, [name]: value };
      return newDatas;
    });
  };

  return (
    <div className={styles.containerAuth}>
      <form onSubmit={onHandleSubmit}>
        <div className={styles.elementForm}>
          <label>Email</label>

          <input 
            type="text" 
            value={datasLogin.email}
            onChange={onHandleChange}
            name="email"
            placeholder='Type your email'
          />
        </div>

        <div className={styles.elementForm}>
          <label>Password</label>

          <input 
            type="text" 
            value={datasLogin.password}
            onChange={onHandleChange}
            name="password"
            placeholder='Type your password'
          />
        </div>

        <div className={styles.buttonSubmit}>
          <button 
            type='submit'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};