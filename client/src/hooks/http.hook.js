import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body) //Приводим body к json-объекту, иначе в браузере Network -> Payload будет [object Object]
                headers['Content-Type'] = 'application/json' // Когда мы работаем с json мы должны явно указать, что по сети мы передаем json. Иначе в консоли на сервере будет указываться пустой объект
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false)

            return data
        } catch(e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}