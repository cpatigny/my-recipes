import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import './GoBack.scss';

const GoBack = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    // if the user clicked on a link on the website
    // if he directly type the url to come to this page
    // the go back arrow will redirect to home page
    if (state?.hasClickedLink) {
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
