import { useState } from 'react';
import { Button, Modal } from 'antd';
import StudentForm from './StudentForm';
import type { Student } from '../types/students';

const AddStudent = ({ schoolId }: { schoolId: Student['schoolId'] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className=" btn-primary"
      >
        + Add Student
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title="Add Student"
      >
        <StudentForm
          schoolId={schoolId}
          onStudentAdded={() => setOpen(false)}
        />
      </Modal>
    </>
  );
};

export default AddStudent;
