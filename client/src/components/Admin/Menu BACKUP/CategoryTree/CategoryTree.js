import { useSelector } from 'react-redux';
import styles from './CategoryTree.module.scss';

export default function CategoryTree() {
  const { categories } = useSelector((state) => state.categoryReducer);

  return (
    <div className={styles.categoryTreeContaner}>
      <ul className={styles.tree}>
        Выберите подкатегорию:
        {categories &&
          categories.map((category) => (
            <ul key={category.id}>

                {category.name}
                {category &&
                  category.Subcategories.map((subcategory, index) => (
                    <li key={subcategory.id} tabIndex={index}>
                      {subcategory.name}
                    </li>
                  ))}
         
            </ul>
          ))}
      </ul>
    </div>
  );
}
