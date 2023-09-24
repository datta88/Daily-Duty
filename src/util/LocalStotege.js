export const saveListToLocalStrorage = (tasks) => {
    localStorage.setItem('pinklist', JSON.stringify(tasks));
};