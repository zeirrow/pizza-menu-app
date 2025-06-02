import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, updateName } from './userSlice';

function CreateUser() {
  const user = useSelector(getUser);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return; // Stop if username is empty

    if (user) {
      navigate('/menu'); // If user exists, go to menu
      return;
    }

    dispatch(updateName(username)); // Save username
    navigate('/menu'); // Redirect to menu
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! {user ? user : 'Please start by telling us your name:'}
      </p>

      {!user && (
        <input
          type="text"
          placeholder="Your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          className="input mb-8 w-72"
        />
      )}

      {username !== '' && !user && (
        <div>
          <Button type="submit" btnStyle="primary">
            Create account
          </Button>
        </div>
      )}

      {user && (
        <div>
          <Button to="/menu" btnStyle="primary">
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
