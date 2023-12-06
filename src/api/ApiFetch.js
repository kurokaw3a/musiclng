const CLIENT_ID = '2b2212f7c19a4b9f89596487456eca6f';
const CLIENT_SECRET = 'c6a03071c1994efe9b0733a4a08660a5';
export const getAccessToken = async () => {
  try {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      params,
    );
    const token = await response.json();
    localStorage.setItem('client_acs', token.access_token);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const initialUrl = 'https://api.spotify.com/v1/'

const ACESS_TOKEN = localStorage.getItem('client_acs')

export function ApiFetch(props) {
    const requestOptions = {
      method: props.method || 'GET',
      headers: {
            Authorization: `Bearer ${ACESS_TOKEN}`,
          }
    }
    if (props.method !== 'GET' && props.body) {
      requestOptions.body = JSON.stringify(props.body)
    }
    const promise = new Promise((resolve, reject) => {
      fetch(initialUrl + props.url, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error(response.message)
        })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
    return promise
  }