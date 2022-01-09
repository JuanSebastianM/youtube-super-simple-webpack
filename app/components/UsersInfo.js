import { useFetch } from '../hooks/useFetch';

export const UsersInfo = () => {
  const { userData, getUserData } = useFetch();
  return (
    <div>
      <h2>Users Info</h2>
      <button type='button' onClick={getUserData}>
        Load user
      </button>
      {userData.map((data) => {
        const { email, id, name, phone, picture } = data;
        return (
          <div key={id.value ? id.value : `${name}-${phone}`}>
            <h2>{`${name.title} ${name.first} ${name.last}`}</h2>
            <img src={picture.large} alt={`${name.first} ${name.last}`} />
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </div>
        );
      })}
    </div>
  );
};
