import { Button } from '../utils/utils';
import { ListItem } from './ContactList.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/contacts/contactsSelectors';
import {
  fetchAllContacts,
  fetchDeleteContact,
} from 'redux/contacts/contactsOperations';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const list = useSelector(selectFilteredContacts);

  const onContactDelete = id => dispatch(fetchDeleteContact(id));
  return (
    <ul>
      {list.map(({ id, name, phone }) => (
        <ListItem key={id}>
          {name}: {phone}
          <Button
            onClick={() => {
              onContactDelete(id);
            }}
          >
            Delete
          </Button>
        </ListItem>
      ))}
    </ul>
  );
};
