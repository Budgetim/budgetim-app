export const deleteCategory = async (id: number, callback: () => void) => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      callback();
    }
  } catch (error) {
    console.log(error);
  }
}
