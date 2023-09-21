import { useState } from 'react';
import './Comments.css';

const Comments = ({ setCurrentItem, currentItem, items, setItems }) => {
    const [color, setColor] = useState('#000000');
    const [text, setText] = useState('');

    const onSubmitComment = (e) => {
        e.preventDefault();
        if(text.length > 0 && items.length > 0) {
            const newComment = {
                id: Date.now(),
                text,
                color
            }

            const newItems = items.map(item => {
                if(item.id === currentItem.id) {

                   const obj = {
                    id: item.id,
                    title: item.title,
                    comments: [...item.comments, newComment]
                   }

                   setCurrentItem(obj);
                   localStorage.setItem('lsCurentItem', JSON.stringify(obj));

                   return obj
                } else {
                    return item
                }
            })

            setItems(newItems);
            localStorage.setItem('lsItems', JSON.stringify(newItems));
            setColor('#000000');
            setText('');
        }
    }


    return (
        <section className="comments">
            <h2 className='comments__title'>Coments #{currentItem ? currentItem.id : ''}</h2>

            <ul className='list-comments'>
                {currentItem && (
                    currentItem.comments.map(comment => (
                        <li key={comment.id} className='list-comments__comment'>
                            <span style={{display: 'block', width: '50px', height: '50px', backgroundColor: comment.color}}/>
                            <p className='list-comments__text'>{comment.text}</p>
                        </li>
                    ))
                )}
            </ul>

            <form className='form-comments' onSubmit={(e) => onSubmitComment(e)}>
                <input 
                    className='form-comments__color-pick' 
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)} 
                />
                <textarea 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    className='form-comments__text-area' 
                    placeholder='Type comment here...' 
                />
                <button className='form-comments__submit' type='submit'>Add new</button>
            </form>
        </section>
    )
}

export default Comments;