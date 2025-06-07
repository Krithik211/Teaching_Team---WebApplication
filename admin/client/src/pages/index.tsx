import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'admin' && password === 'admin') {
      router.push('/dashboard/manage-course');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
