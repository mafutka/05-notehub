import css  from './NoteList.module.css'

// При першому завантаженні додатка користувачу потрібно відображати список його власних нотатків.

<ul className={css.list}>
	{/* Набір елементів списку нотатків */}
  <li className={css.listItem}>
    <h2 className={css.title}>Note title</h2>
    <p className={css.content}>Note content</p>
    <div className={css.footer}>
      <span className={css.tag}>Note tag</span>
      <button className={css.button}>Delete</button>
    </div>
  </li>
</ul>


// Компонент NoteList – це список нотатків, додай його в App під хедером. 
// Компонент NoteList має створювати DOM-елемент наступної структури: