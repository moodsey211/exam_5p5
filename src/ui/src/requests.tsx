const fetchOptions = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  method: 'GET',
};

export async function get(url: string) {
  const apiUrl = import.meta.env.VITE_API_URL + url;

  const response = await fetch(apiUrl, fetchOptions);
  return await response.json();
}

export async function post(url: string, payload: any) {
  const apiUrl = import.meta.env.VITE_API_URL + url;
  const requestOptions = {
    ...fetchOptions,
    method: 'POST',
  };

  if (payload) {
    requestOptions.body = JSON.stringify(payload);
  }

  const response = await fetch(apiUrl, requestOptions);
  return await response.json();
}

export async function del(url: string) {
  const apiUrl = import.meta.env.VITE_API_URL + url;
  const requestOptions = {
    ...fetchOptions,
    method: 'DELETE',
  };

  const response = await fetch(apiUrl, requestOptions);
  return await response.json();
}

