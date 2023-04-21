import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import './GoBack.scss';

const GoBack = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    // if we come from home page by clicking on a recipe link
    if (state?.fromHome) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.HOME);
  };

  return (
    <button className='go-back' onClick={handleClick}>
      <span className='material-icons-round go-back-icon'>west</span>
    </button>
  );
};

export default GoBack;
