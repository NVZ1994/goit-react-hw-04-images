const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '33581591-1c70c0dad5ebd38d54cbcacf2'

export const getPictures = (search, page) => {
    return fetch(`${BASE_URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
}