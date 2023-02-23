import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navigation.scss';

export function Navigation({ title }) {
  const currentCategory = useSelector((state) => state.controls.currentFilter);
  const { category } = useParams();

  return (
    <nav className='navigation'>
      <div className='navigation-container'>
        <Link to={`/books/${category}`} data-test-id='breadcrumbs-link' className='navigation-link'>
          {currentCategory}
        </Link>
        <span>/</span>
        <span data-test-id='book-name' className='navigation-link'>
          {title}
        </span>
      </div>
    </nav>
  );
}
