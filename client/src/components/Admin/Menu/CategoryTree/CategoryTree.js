import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './CategoryTree.module.scss';

export default function CategoryTree() {
  const { categories } = useSelector((state) => state.categoryReducer);
  const history = useHistory();

  const selectSubcategoryHandler = (event) => {
    const { subcategory } = JSON.parse(event.target.dataset.subcategory);
    history.push(`/menu/subcategory/${subcategory.id}`);
  };

  return (
    <>
      <button onClick={() => history.push('/menu/category/new')} className={styles.buttonMain}>
        Изменить или добавить
      </button>
      <div className={styles.categoryTreeContaner}>
        <ul className={styles.tree}>
          <h3>Выберите подкатегорию:</h3>
          {categories &&
            categories.map((category) => (
              <ul key={category.id}>
                {category.name}
                {category &&
                  category.Subcategories.map((subcategory, index) => (
                    <li
                      onClick={selectSubcategoryHandler}
                      key={subcategory.id}
                      tabIndex={index}
                      data-subcategory={JSON.stringify({ subcategory })}
                    >
                      {subcategory.name}
                    </li>
                  ))}
              </ul>
            ))}
        </ul>
        <div className={styles.positionsContainer}></div>
      </div>
    </>
  );
}
