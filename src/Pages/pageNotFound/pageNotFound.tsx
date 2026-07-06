import { Link } from 'react-router-dom';
import { APP_PATH } from '../../const';

function PageNotFound(): JSX.Element{
  return(
    <div>404 Page not found <Link to={APP_PATH.PAGE_MAIN}>Go home</Link></div>
  );
}

export default PageNotFound;
