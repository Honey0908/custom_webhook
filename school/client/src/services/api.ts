const apiBaseURL = import.meta.env.VITE_REACT_API_BASE_URL + '/api';

export const fetchStudents = async () => {
  const res = await fetch(`${apiBaseURL}/students`);
  if (!res.ok) throw new Error('Network response was not ok');
  const data = await res.json();
  return data.data;
};
