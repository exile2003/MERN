import React, {useState, useContext, useCallback, useEffect} from 'react'
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";
import {useMessage} from '../hooks/message.hook';


export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request, logout} = useHttp()
    const {token} = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const message = useMessage()


    const fetchLinks = useCallback( async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            //if (!fetched) auth.logout();
            //console.log("fetched: ", (typeof fetched))

            setLinks(fetched)
        }
        catch(e) {
            message('Время действия аутентификации закончилось.')
            message('Для продолжения работы введите логин и пароль заново.')
            auth.logout();
        }
    }, [token, request, logout])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if(loading) {
        return <Loader />
    }

    return (
      <div>
          {!loading && <LinksList links={links} />}
      </div>
    )
}