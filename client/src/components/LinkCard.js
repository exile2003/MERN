import React from 'react'

export const LinkCard = ( {link} ) => {
    return (
      <>
        <h2>Ссылка</h2>

          <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>  { /*атрибут target="_blank" открывает страницу в новой вкладке / rel="noopener noreferrer" Noopener необходим для повышения безопасности вашего сайта и предотвращения доступа других сайтов к вашей странице (через сеанс браузера). Noreferrer используется для защиты реферальной информации от ее передачи на целевой веб-сайт, что также скрывает реферальный трафик в аналитике Google. Информация с сайта https://cpa-ratings.ru/stati/chto-takoe-rel--noreferrer-noopener-i-kak-etot-teg-vliyaet-na-seo */}
          <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
          <p>Количество кликов по ссылке: <strong>{link.cliks}</strong></p>
          <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>

      </>
    )
}