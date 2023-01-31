import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {LinkCard} from '../components/LinkCard'
import {Loader} from '../components/Loader'
import {useMessage} from '../hooks/message.hook';


export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const auth = useContext(AuthContext)
    const message = useMessage()


    const getLink = useCallback(async() => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch(e) {
            message('Время действия аутентификации закончилось.')
            message('Для продолжения работы введите логин и пароль заново.')
            auth.logout();
        }
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if(loading) {
        return <Loader />
    }

    return (
      <>
          { !loading && link && <LinkCard link={link} /> }
      </>
    )
}