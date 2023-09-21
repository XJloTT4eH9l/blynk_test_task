
import { useState, useEffect } from 'react';
import './Items.css';

const Items = ({ items, setItems, currentItem, setCurrentItem }) => {
    const [value, setValue] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if(value.length !== 0) {
            const newItem = {
                id: Date.now(), 
                title: value, 
                comments: []
            }
        
            setItems(prev => [...prev, newItem]);
            localStorage.setItem('lsItems', JSON.stringify([...items, newItem]));
            setValue('');
            if(items.length === 0) {
                setCurrentItem(newItem);
                localStorage.setItem('lsCurentItem', JSON.stringify(newItem));
            }
        }
    }

    const onItem = (item) => {
        setCurrentItem(item);
        localStorage.setItem('lsCurentItem', JSON.stringify(item));
    }

    const onDelete = (e, id, i) => {
        e.stopPropagation();
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        localStorage.setItem('lsItems', JSON.stringify(newItems));
        const itemsLength = items.length - 1;
        if(currentItem.id === id ) {
            if(itemsLength === 0) {
                setCurrentItem(null);
                localStorage.setItem('lsCurentItem', JSON.stringify(null));
            } else if (itemsLength === i) {
                setCurrentItem(items[i - 1]);
                localStorage.setItem('lsCurentItem', JSON.stringify(items[i - 1]));
            } else if (itemsLength > i) {
                setCurrentItem(items[i + 1]);
                localStorage.setItem('lsCurentItem', JSON.stringify(items[i + 1]));
            }
        } 

    }

    return (
        <section className="items">
            <h2 className='items__title'>Items</h2>

            <form className='form-item' onSubmit={(e) => onSubmit(e)}>
                <input 
                    className='form-item__input' 
                    type="text" value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Type name here...' 
                />
                <button 
                    className='form-item__submit' 
                    type="submit"
                >
                    Add new
                </button>
            </form>

            <ul className='list-items'>
                {items.map((item, i) => (
                    <li 
                        key={item.id} 
                        onClick={() => onItem(item)}
                        className={item.id === currentItem?.id ? `list-items__item list-items__item--active ${items.length === 1 && 'single'}` : `list-items__item ${items.length === 1 && 'single'}`}
                    >
                        <h3 className='list-items__title'>{item.title}</h3>
                        <div className="list-items__container">
                            <span className='list-items__count'>{item.comments.length}</span>
                            <button onClick={(e) => onDelete(e, item.id, i)} className='list-items__delete'>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Items;