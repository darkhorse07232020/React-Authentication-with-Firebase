import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'components/Button';
import firebase from 'firebase';
import { toast } from 'react-toast';
import styles from './style.module.scss';
import Icon from '../Icon';

const Sidebar = () => {
  const logOutUser = () => {
    try {
      firebase.auth().signOut();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.sidebar}>
      <Icon name="logo" height={30} additionalClass="fill-current text-white" />
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link} activeClassName={styles.selected}>
          Dashboard
        </NavLink>
      </nav>
      <Button className="absolute bottom-5 w-56" onClick={logOutUser}>
        Log out
      </Button>
    </div>
  );
};

export default Sidebar;
