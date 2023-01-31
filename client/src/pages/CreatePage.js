import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useMessage} from '../hooks/message.hook';


export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')
    const message = useMessage()


    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                //console.log(data)
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
                message('Время действия аутентификации закончилось.')
                message('Для продолжения работы введите логин и пароль заново.')
                auth.logout();
            }
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
      <div className="row">
          <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
              <div className="input-field ">
                  <input
                    placeholder="Вставьте ссылку"
                    id="link"
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                  />
                  <label htmlFor="link">Введите ссылку</label>
              </div>
          </div>
      </div>
    )
}