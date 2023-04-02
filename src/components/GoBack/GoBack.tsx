import { useNavigate } from 'react-router-dom';

import './GoBack.scss';

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <button className='go-back' onClick={() => navigate(-1)}>
      <span className='material-icons-round go-back-icon'>west</span>
    </button>
  );
};

export default GoBack;
