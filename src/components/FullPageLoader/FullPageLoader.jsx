import Spinner from 'react-bootstrap/Spinner';

import './FullPageLoader.css';

const FullPageLoader = () => {
   return (
      <div className="full-page-loader d-flex justify-content-center align-items-center">
         <Spinner className="" animation="border" role="status" variant='warning'>
            <span className="visually-hidden">Loading...</span>
         </Spinner>
      </div>
   )
}
export default FullPageLoader;