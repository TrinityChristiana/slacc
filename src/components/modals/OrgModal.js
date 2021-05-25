import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Message,
  Modal
} from 'semantic-ui-react';
import { useAuth } from '../../contexts/auth-context';
import useIsValidURL from '../custom-hooks/useIsValidUrl';

const defaultInfoState = {
  name: '',
  image: ''
};

const OrgModal = ({ children, firebaseKey }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(!!(firebaseKey));
  const [orgFormInfo, setOrgFormInfo] = useState(defaultInfoState);
  const { createOrg } = useAuth();
  const history = useHistory();
  const { isValid } = useIsValidURL(orgFormInfo.image);
  useEffect(() => {
    if (firebaseKey) {
      console.log(firebaseKey);
    }
  }, []);

  const handleChange = (e) => setOrgFormInfo((prev) => ({
    ...prev,
    [e.target.name]: e.target.value
  }));

  const handleSubmit = () => {
    setIsLoading(true);
    createOrg(orgFormInfo).then((newKey) => {
      setOpen(false);
      setOrgFormInfo(defaultInfoState);
      history.push(`/o/${newKey}`);
    });
  };

  const canSubmit = !isValid || !orgFormInfo.name;
  return (
    <Modal size='tiny' onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={children}>
      <Modal.Header>{firebaseKey ? 'Edit' : 'Create'} An Organization</Modal.Header>
      <Modal.Content image>
        <Form style={{ width: '100%' }} error={canSubmit} loading={isLoading}>
          <Form.Group
            widths='equal'
          >
            <Form.Field
              width={6}
              onChange={handleChange}
              value={orgFormInfo.name}
              error={!orgFormInfo.name}
              name='name'
              label='Organiation Name'
              placeholder='Name'
              control={Input}
            />
            <Form.Field
              width={6}
              error={!isValid}
              onChange={handleChange}
              name='image'
              value={orgFormInfo.image}
              label='Organiation Image'
              placeholder='Image URL'
              control={Input}
            />
          </Form.Group>
          <Message
            error
            content={
              <div>
                {!orgFormInfo.name && <>- You must submit a name<br/></>}

                {!isValid && '- You must submit a valid photo url'}
              </div>
            }
          />
        </Form>
        <hr/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content='Create Organizaion'
          labelPosition='right'
          icon='checkmark'
          onClick={handleSubmit}
          positive
          disabled={canSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default OrgModal;
