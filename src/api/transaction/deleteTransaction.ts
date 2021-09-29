export const deleteTransaction = async (id: number, callback: () => void) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/delete', {
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
