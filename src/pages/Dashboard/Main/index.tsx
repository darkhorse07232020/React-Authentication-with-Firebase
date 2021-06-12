import React from 'react';
// import firebase from '../../services/firebase';
// import useFirestoreDoc from '../../hooks/useFirestoreDoc';
import Headline from '../../../components/Headline';
import styles from '../style.module.scss';

const Home = () => {
  // const userRef = firebase.firestore().collection(`users`).doc(firebase.auth().currentUser.uid);
  // const { isLoading, data: user } = useFirestoreDoc(userRef);

  return (
    <div>
      <Headline level={1} classLevel={3} additionalClass={styles.hl}>
        Dashboard Test
      </Headline>
      {/* {isLoading && <span>Loading...</span>}
      {user && (
        <p>
          Hello {user.firstname} {user.lastname}
        </p>
      )} */}
    </div>
  );
};

export default Home;
