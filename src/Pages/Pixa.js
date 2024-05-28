import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PIXA() {
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('s');
    if (search) {
      setInput(search);
      fetchImages(search);
    } else {
      fetchImages('nature');
    }
  }, [location]);

  const fetchImages = async (query) => {
    const response = await fetch(`https://pixabay.com/api/?key=43631118-f653f72b1390c59444f288ee4&q=${encodeURIComponent(query)}&image_type=photo`);
    const data = await response.json();
    setImages(data.hits);
  };

  const handleSearch = () => {
    fetchImages(input);
  };

  const rows = images.reduce((rows, key, index) => (index % 4 === 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, []);

  return (
    <div className='container mt-3'>
      <div className="input-group mb-3">
        <input type="text" className="form-control" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="btn btn-primary" onClick={handleSearch}> search </button>
      </div>
      <table className="table table-bordered table-responsive">
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((img) => (
                <td key={img.id} className="text-center align-middle">
                  <a href={img.largeImageURL} target="_blank" rel="noopener noreferrer">
                    <img src={img.webformatURL} alt={img.tags} className="img-fluid" style={{ maxHeight: '150px' }} />
                  </a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
