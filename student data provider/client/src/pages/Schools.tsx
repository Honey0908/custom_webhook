import { useQuery } from '@tanstack/react-query';
import { fetchSchools } from '../services/schools';
import SchoolCard from '../components/SchoolCard';
import type { School } from '../types/school';
import StatusMessage from '../components/StatusMessage';

const Schools = () => {
  const {
    data: schools,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['schools'],
    queryFn: fetchSchools,
  });

  if (isLoading)
    return <StatusMessage type="loading" message="Loading schools..." />;
  if (error)
    return <StatusMessage type="error" message="Error loading schools" />;

  const schoolList = schools?.data ?? [];

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center tracking-wide drop-shadow">
        Schools
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {schoolList.length > 0 ? (
          schoolList.map((school: School) => (
            <SchoolCard key={school.schoolId} school={school} />
          ))
        ) : (
          <StatusMessage type="empty" message="No schools found." />
        )}
      </div>
    </div>
  );
};

export default Schools;
