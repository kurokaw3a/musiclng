const initialUrl = 'https://api.spotify.com/v1/'

let store;
export const injectStore = (_store)=>{
 store = _store
}
export function ApiFetch(props) {
  const token = store.getState()
  const requestOptions = {
      method: props.method || 'GET',
      headers: {
            Authorization: `Bearer ${token.player.access_token}`,
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