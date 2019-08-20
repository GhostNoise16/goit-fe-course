const URL = "http://localhost:3000/notes";

export const saveNote = note => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(note)
  };

  return fetch(URL, options).then(response => {
    if (response.ok) return response.json();

    throw new Error(`Error while fetching - ${response.statusText}`);
  });
};

export const getNotes = () => {
  return fetch(URL).then(response => {
    if (response.ok) return response.json();

    throw new Error(`Error while fetching - ${response.statusText}`);
  });
};

export const updateNote = (id, updateContent) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateContent)
  };

  return fetch(`${URL}/${id}`, options).then(response => {
    if (response.ok) return response.json();

    throw new Error(`Error while fetching - ${response.statusText}`);
  });
};

export const deleteNote = id => {
  const options = {
    method: "DELETE"
  };

  return fetch(`${URL}/${id}`, options).then(response => {
    if (response.ok) return response.json();

    throw new Error(`Error while fetching: ${response.statusText}`);
  });
};
