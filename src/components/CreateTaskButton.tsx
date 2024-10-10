// src/components/CreateTaskButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';

const CreateTaskButton: React.FC = () => {
  const handleCreateTask = () => {
    // Logic to open modal or trigger task creation
  };

  return (
    <Button variant="primary" className="mb-3" onClick={handleCreateTask}>
      + Create Task
    </Button>
  );
};

export default CreateTaskButton;
