import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = ( url, token, method= 'GET', body = null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                let response;
                if (method === 'GET') {
                    response = await axios.get(url, config)
                } else if (method === 'POST') {
                    response = await axios.post(url, body, config)
                } else if (method === 'PUT') {
                    response = await axios.put(url, body, config)
                } else if (method === 'DELETE') {
                    response = await axios.delete(url, config)
                } else {
                    throw new Error('Unsupported method');
                }

                setData(response.data.result)
            } catch (err) {
                console.log('Error fetching data', err)
                setError('Failed to fetch data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url, token])

    return { data, loading, error}
}

export default useFetch;