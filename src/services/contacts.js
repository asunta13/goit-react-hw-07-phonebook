import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://640064d363e89b0913adc12c.mockapi.io/api/contacts',
});

export const getAllContacts = async () => {
  const { data } = await contactsInstance.get('/');
  return data;
};

export const addContact = async id => {
  const { data } = await contactsInstance.post('/', id);
  return data;
};

export const deleteContact = async id => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};
