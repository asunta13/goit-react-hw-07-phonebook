import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Label, Input, Emessage } from './ContactForm.styled';
import { Button } from '../utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddContact } from 'redux/contacts/contactsOperations';
import { selectContacts } from 'redux/contacts/contactsSelectors';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(4)
    .max(40)
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Please enter contact name'),
  phone: yup
    .string()
    .min(6)
    .max(15)
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Please enter contact number'),
});

export const ContactForm = () => {
  const initialValues = {
    name: '',
    phone: '',
  };

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const isInContacts = contacts.some(contact => {
      const existName = contact.name.toLowerCase();
      const newName = values.name.toLowerCase();
      return existName === newName;
    });
    if (isInContacts) alert(`${values.name} is already in contacts.`);
    else dispatch(fetchAddContact(values));
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <Label>
            Name
            <Input type="text" name="name" />
          </Label>
          <Emessage component="span" name="name" />
          <Label>
            Number
            <Input type="tel" name="phone" />
          </Label>
          <Emessage component="span" name="phone" />
          <Button type="submit">Add contact</Button>
        </Form>
      </Formik>
    </>
  );
};
