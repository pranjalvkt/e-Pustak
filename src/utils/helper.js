import categories from "./categories";

export function getCategoryTextById(id, lang) {
    const category = categories.find(category => category.id === id);
    if (category) {
      return category[lang];
    } else {
      return null;
    }
}