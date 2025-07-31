import StudentList from '../components/StudentList';

const Students = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 card border border-secondary">
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center tracking-wide drop-shadow">
        Student List
      </h1>
      <div className="bg-white rounded-xl p-6 shadow-md overflow-auto">
        <StudentList />
      </div>
    </div>
  );
};

export default Students;
