const clientURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_CLIENT_URL : process.env.REACT_APP_PRO_CLIENT__URL

export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                const error = await response.json();
                alert(error.message)
                if(error.redirect){
                    window.location.assign(`${clientURL}/login`);
                    localStorage.removeItem('token')
                }
            }
            const data = await response.json();
            return data;
        } catch(e) {
            throw e;
        }
    };

    return {request}
}