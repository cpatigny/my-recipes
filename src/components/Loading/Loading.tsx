import './Loading.scss';

export const Loading = () => (
  <div className='loading'>
    <div className='dots'>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
    </div>
    <p>Chargement...</p>
  </div>
);
