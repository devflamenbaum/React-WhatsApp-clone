import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {

    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts()
    const { createConversation } = useConversations()
    const handleCheckboxChange = (contactId) => {
        setSelectedContactIds(prevSelectedContactId => {
            if(prevSelectedContactId.includes(contactId)){
                return prevSelectedContactId.filter(prevId => contactId !== prevId)
            } else{
                return [...prevSelectedContactId, contactId]
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createConversation(selectedContactIds)
        closeModal()
    }


    return (
        <>
        <Modal.Header closeButton>Create Conversation</Modal.Header>
        <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  {contacts.map(contact => (
                      <Form.Group controlId={contact.id} key={contact.id}>
                          <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}
                          />
                      </Form.Group>
                  ))}
                  <Button type="submit">Create</Button>
              </Form>    
        </Modal.Body>  
      </>
    )
}
