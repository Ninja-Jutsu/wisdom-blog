import { Loader } from 'react-feather'

import styles from './Spinner.module.css'

function Spinner() {
  return (
    <div>
      <span className={styles.spinner}>
        <Loader />
      </span>
    </div>
  )
}

export default Spinner
