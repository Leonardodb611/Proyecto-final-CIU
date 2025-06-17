import { useEffect, useState } from 'react';
export const useGetPublications = () => {
  const [publications, setPublications] = useState();
  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((publications) => setPublications(publications));
  }, []);
  return {publications}
};
